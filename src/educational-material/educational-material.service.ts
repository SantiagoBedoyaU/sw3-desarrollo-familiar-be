import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/shared/service/base-service';
import { EducationalMaterial } from './entities/educational-material.entity';
import { EducationalMaterialRepository } from './educational-material.repository';
import { CreateEducationalMaterialDto } from './dto/create-educational-material.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class EducationalMaterialService extends BaseService<
  EducationalMaterial,
  EducationalMaterialRepository
> {
  private readonly bucketName: string = 'educational-material';

  constructor(
    private readonly educationalMaterialRepository: EducationalMaterialRepository,
    private readonly supabaseService: SupabaseService,
  ) {
    super(educationalMaterialRepository);
  }

  async createAndUpload(
    createEducationalMaterialDto: CreateEducationalMaterialDto,
    file: Express.Multer.File,
  ) {
    const exist = await this.educationalMaterialRepository.findOne({
      title: createEducationalMaterialDto.title,
    });
    if (exist) {
      throw new BadRequestException(
        'Ya existe un material educativo con este nombre',
      );
    }

    const parts = file.originalname.split('.');
    const ext = parts.pop();
    const name = parts.join('');
    const filePath = this.sanitizeAndGetFilePath(
      createEducationalMaterialDto.category,
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
      createEducationalMaterialDto.fileAddress = fullPath;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('failed to upload file');
    }

    const educationalMaterial = await this.educationalMaterialRepository.create(
      {
        ...createEducationalMaterialDto,
        fileAddress: createEducationalMaterialDto.fileAddress!,
      },
    );

    return educationalMaterial;
  }

  async download(id: string) {
    const result = await this.educationalMaterialRepository.findOne({
      _id: id,
    });
    if (!result) {
      throw new NotFoundException('No se encontro el material educativo');
    }
    try {
      const data = await this.supabaseService.downloadFile(
        this.bucketName,
        result.fileAddress,
      );
      await this.educationalMaterialRepository.update(
        { _id: id },
        {
          $inc: { downloadCounter: 1 },
        },
      );
      return { title: result.title, data };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Fallo al descargar el articulo');
    }
  }

  sanitizeAndGetFilePath(category: number, name: string, ext: string): string {
    const now = Date.now().toString();
    const sanitize = (text: string): string =>
      text
        .normalize('NFD') // Separa letras de sus tildes
        .replace(/[\u0300-\u036f]/g, '') // Elimina las tildes
        .replace(/ñ/g, 'n') // Reemplaza ñ
        .replace(/Ñ/g, 'N') // Reemplaza Ñ
        .replace(/[^a-zA-Z0-9-_]/g, '_'); // Reemplaza cualquier otro carácter raro
    const fileName = sanitize(name);
    return `${category}/${fileName}-${now}.${ext}`;
  }
}
