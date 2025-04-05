import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService] // 👈 Esto es clave
})
export class MailModule {}
