import { BaseRepository } from 'src/shared/repository/base-repository';
import { RecoveryCode } from './entities/recovery-code.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecoveryCodeRepository extends BaseRepository<RecoveryCode> {
  constructor(@InjectModel(RecoveryCode.name) model: Model<RecoveryCode>) {
    super(model);
  }
}
