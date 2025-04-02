import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResearchArticleDto } from './dto/create-research-article.dto';
import { UpdateResearchArticleDto } from './dto/update-research-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ResearchArticle } from './entities/research-article.entity';
import { Model } from 'mongoose';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ResearchArticlesService {
  private readonly bucketName: string = 'research-articles';
  constructor(
    @InjectModel(ResearchArticle.name) private model: Model<ResearchArticle>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    createResearchArticleDto: CreateResearchArticleDto,
    file: Express.Multer.File,
  ) {
    // find existing article with same name
    const exist = await this.model.findOne({
      title: createResearchArticleDto.title,
    });
    if (exist) {
      throw new BadRequestException('Ya existe un articulo con este titulo');
    }

    const [name, ext] = file.originalname.split('.');
    const now = Date.now().toString();
    const filePath = `${createResearchArticleDto.thematicAxis}/${name}-${now}.${ext}`;
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

    const createdResearchArticle = new this.model(createResearchArticleDto);
    return createdResearchArticle.save();
  }

  findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const result = await this.model.findById(id);
    if (result) {
      await this.model.findOneAndUpdate({ _id: id }, { $inc: { counter: 1 } });
    }
    return result;
  }

  async download(id: string) {
    const result = await this.model.findById(id);
    if (!result) {
      throw new NotFoundException('No se encontro el articulo');
    }
    try {
      const data = await this.supabaseService.downloadFile(
        this.bucketName,
        result.fileAddress,
      );
      return { title: result.title, data };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Fallo al descargar el articulo');
    }
  }

  update(id: string, updateResearchArticleDto: UpdateResearchArticleDto) {
    return this.model.findByIdAndUpdate({ _id: id }, updateResearchArticleDto, {
      update: true,
    });
  }

  async remove(id: string) {
    const result = await this.model.findById(id);
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
    return this.model.findByIdAndDelete(id);
  }
}
