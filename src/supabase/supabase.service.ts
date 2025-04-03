import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly client = null;
  constructor(private readonly configService: ConfigService) {
    this.client = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_API_KEY'),
    );
  }

  async uploadFileToBucket(
    bucket: string,
    filePath: string,
    file: Express.Multer.File,
  ) {
    const { data, error } = await this.client.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        upsert: false,
      });
    if (error) {
      throw error;
    }
    return data.fullPath;
  }
  async downloadFile(bucketName: string, fileAddress: string) {
    const { data, error } = await this.client.storage
      .from(bucketName)
      .download(fileAddress.split(`${bucketName}/`)[1]);
    if (error) {
      throw error;
    }
    return data;
  }
  async deleteFile(bucketName: string, fileAddress: string) {
    const { error } = await this.client.storage
      .from(bucketName)
      .remove([fileAddress.split(`${bucketName}/`)[1]]);

    if (error) {
      throw error;
    }
  }
}
