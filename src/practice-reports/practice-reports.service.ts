import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePracticeReportDto } from './dto/create-practice-report.dto';
import { UpdatePracticeReportDto } from './dto/update-practice-report.dto';
import { PracticeReportsRepository } from './practice-reports.repository';
import { PracticeReport } from './entities/practice-report.entity';
import { BaseService } from '../shared/service/base-service';
import { EducationalInstitutionsRepository } from '../educational-institutions/educational-institutions.repository';
import { PracticeReportQueryParams } from './dto/practice-reports-query-params.dto';

@Injectable()
export class PracticeReportsService extends BaseService<
  PracticeReport,
  PracticeReportsRepository
> {
  private readonly bucketName: string = 'practice-reports';

  constructor(
    private readonly practiceReportsRepository: PracticeReportsRepository,
    private readonly supabaseService: SupabaseService,
    private readonly educationalInstitutionsRepository: EducationalInstitutionsRepository,
  ) {
    super(practiceReportsRepository);
  }

  async createAndUpload(
    createPracticeReportDto: CreatePracticeReportDto,
    file: Express.Multer.File,
  ) {
    const exist = await this.practiceReportsRepository.findOne({
      title: createPracticeReportDto.title,
    });
    if (exist) {
      throw new BadRequestException('now exists a report with this title');
    }

    //check if institution exists
    const institution = await this.educationalInstitutionsRepository.findOne({
      _id: createPracticeReportDto.institutionId,
    });

    if (!institution) {
      throw new NotFoundException('the institution does not exist');
    }

    const [name, ext] = file.originalname.split('.');
    const filePath = this.sanitizeAndGetFilePath(
      createPracticeReportDto.primaryThematicAxis,
      name,
      ext,
    );

    try {
      const fullPath = await this.supabaseService.uploadFileToBucket(
        this.bucketName,
        filePath,
        file,
      );
      // union url with bucket name
      createPracticeReportDto.fileAddress = fullPath;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('failed to upload file');
    }

    const { institutionId, researchArticle, ...rest } = createPracticeReportDto;

    const newReport: Omit<PracticeReport, '_id'> = {
      ...rest,
      fileAddress: createPracticeReportDto.fileAddress,
      institution: institutionId,
      ...(researchArticle && {
        researchArticle,
      }),
    };

    const created = await this.practiceReportsRepository.create(newReport);
    return {
      message: 'El informe de práctica fue registrado exitosamente.',
      report: created,
    };
  }

  findAll(queryParams: PracticeReportQueryParams) {
    const query = {};

    if (queryParams.title) {
      query['title'] = {
        $regex: queryParams.title,
        $options: 'i',
      };
    }

    if (queryParams.authors) {
      query['authors'] = {
        $in: queryParams.authors.split(',').map((author) => author.trim()),
      };
    }
    if (queryParams.keywords) {
      query['keywords'] = {
        $in: queryParams.keywords.split(',').map((keyword) => keyword.trim()),
      };
    }
    if (queryParams.primaryThematicAxis) {
      query['primaryThematicAxis'] = {
        $regex: queryParams.primaryThematicAxis,
        $options: 'i',
      };
    }
    if (queryParams.secondaryThematicAxis) {
      query['secondaryThematicAxis'] = {
        $regex: queryParams.secondaryThematicAxis,
        $options: 'i',
      };
    }
    if (queryParams.year) {
      query['year'] = queryParams.year;
    }

    return this.practiceReportsRepository.findAll(
      query,
      queryParams.limit,
      queryParams.page,
    );
  }

  async findOne(id: string) {
    const result = await this.practiceReportsRepository.findOne({ _id: id });
    if (!result) {
      throw new NotFoundException('Practice report not found');
    }

    await this.practiceReportsRepository.update(
      { _id: id },
      { $inc: { counter: 1 } },
    );

    return result;
  }

  async download(id: string) {
    const result = await this.practiceReportsRepository.findOne({ _id: id });
    if (!result) {
      throw new NotFoundException('Practice report not found');
    }

    try {
      const data = await this.supabaseService.downloadFile(
        this.bucketName,
        result.fileAddress,
      );

      await this.practiceReportsRepository.update(
        { _id: id },
        {
          $inc: { downloadCounter: 1 },
        },
      );

      return { title: result.title, data };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('failed to download file');
    }
  }

  update(id: string, updatePracticeReportDto: UpdatePracticeReportDto) {
    return this.practiceReportsRepository.update(
      { _id: id },
      updatePracticeReportDto,
    );
  }

  async remove(id: string) {
    const result = await this.practiceReportsRepository.findOne({ _id: id });
    if (!result) {
      throw new NotFoundException('Practice report not found');
    }

    try {
      await this.supabaseService.deleteFile(
        this.bucketName,
        result.fileAddress,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('failed to delete file');
    }

    return this.practiceReportsRepository.delete({ _id: id });
  }

  sanitizeAndGetFilePath(
    primaryThematicAxis: string,
    name: string,
    ext: string,
  ): string {
    const now = Date.now().toString();
    const sanitize = (text: string): string =>
      text
        .normalize('NFD') // Separa letras de sus tildes
        .replace(/[\u0300-\u036f]/g, '') // Elimina las tildes
        .replace(/ñ/g, 'n') // Reemplaza ñ
        .replace(/Ñ/g, 'N') // Reemplaza Ñ
        .replace(/[^a-zA-Z0-9-_]/g, '_'); // Reemplaza cualquier otro carácter raro
    const axis = sanitize(primaryThematicAxis);
    const fileName = sanitize(name);
    return `${axis}/${fileName}-${now}.${ext}`;
  }

  getTop5() {
    return this.practiceReportsRepository.getTop5();
  }
}
