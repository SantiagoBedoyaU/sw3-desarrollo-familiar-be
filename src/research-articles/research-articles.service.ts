import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResearchArticleDto } from './dto/create-research-article.dto';
import { UpdateResearchArticleDto } from './dto/update-research-article.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ResearchArticleQueryParams } from './dto/research-article-query-params.dto';
import { ResearchArticlesRepository } from './research-articles.repository';

@Injectable()
export class ResearchArticlesService {
  private readonly bucketName: string = 'research-articles';
  constructor(
    private readonly repository: ResearchArticlesRepository,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    createResearchArticleDto: CreateResearchArticleDto,
    file: Express.Multer.File,
  ) {
    // find existing article with same name
    const exist = await this.repository.findOne({
      title: createResearchArticleDto.title,
    });
    if (exist) {
      throw new BadRequestException('Ya existe un articulo con este titulo');
    }

    const [name, ext] = file.originalname.split('.');
    const now = Date.now().toString();
    const filePath = `${createResearchArticleDto.primaryThematicAxis}/${name}-${now}.${ext}`;
    try {
      const fullPath = await this.supabaseService.uploadFileToBucket(
        this.bucketName,
        filePath,
        file,
      );
      createResearchArticleDto.fileAddress = fullPath;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Fallo al subir el archivo');
    }

    const createdResearchArticle = await this.repository.create({
      ...createResearchArticleDto,
      keywords: createResearchArticleDto.keywords.split(','),
      authors: createResearchArticleDto.authors.split(','),
    });
    return createdResearchArticle;
  }

  findAll(queryParams: ResearchArticleQueryParams) {
    const query = {};
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

    return this.repository.findAll(query, queryParams.limit, queryParams.page);
  }

  async findOne(id: string) {
    const result = await this.repository.findOne({ _id: id });
    if (result) {
      await this.repository.update({ _id: id }, { $inc: { counter: 1 } });
    }
    return result;
  }

  async download(id: string) {
    const result = await this.repository.findOne({ _id: id });
    if (!result) {
      throw new NotFoundException('No se encontro el articulo');
    }
    try {
      const data = await this.supabaseService.downloadFile(
        this.bucketName,
        result.fileAddress,
      );
      await this.repository.update(
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

  update(id: string, updateResearchArticleDto: UpdateResearchArticleDto) {
    return this.repository.update({ _id: id }, updateResearchArticleDto);
  }

  async remove(id: string) {
    const result = await this.repository.findOne({ _id: id });
    if (!result) {
      throw new NotFoundException('No se encontro el articulo');
    }
    try {
      await this.supabaseService.deleteFile(
        this.bucketName,
        result.fileAddress,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Fallo al borrar el articulo');
    }
    return this.repository.delete({ _id: id });
  }
}
