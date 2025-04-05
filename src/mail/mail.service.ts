import { Injectable } from '@nestjs/common';
import { MailerSend, Recipient, EmailParams} from 'mailersend';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MailService {
  private mailerSend: MailerSend;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILSEND_KEY,
    });
  }

  async sendWelcomeEmail(name: string, email: string, password: string) {
    const emailParams = new EmailParams()
      .setFrom({
        email: 'noreply@test-r83ql3pw3v0gzw1j.mlsender.net',
        name: 'Escuelas Familiares',
      })
      .setTo([new Recipient(email, name)])
      .setSubject('Bienvenido')
      .setTemplateId(process.env.TEMPLATE_ID)
      .setPersonalization([
        {
          email: email,
          data: {
            name: name,
            email: email,
            password: password,
          },
        },
      ]);
  
    try {
      await this.mailerSend.email.send(emailParams);
      console.log('✅ Correo enviado correctamente');
    } catch (error) {
      
      throw new Error('No se pudo enviar el correo');
    }
  }
}
