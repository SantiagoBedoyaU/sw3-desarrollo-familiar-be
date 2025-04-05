import { Injectable } from '@nestjs/common';
import { MailerSend, Recipient, EmailParams } from 'mailersend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private mailerSend: MailerSend;

  constructor(private readonly configService: ConfigService) {
    this.mailerSend = new MailerSend({
      apiKey: this.configService.get<string>('MAILSEND_KEY'),
    });
  }

  async sendWelcomeEmail(name: string, email: string, password: string) {
    const emailParams = new EmailParams()
      .setFrom({
        email: this.configService.get<string>('EMAIL_FROM'),
        name: 'Escuelas Familiares',
      })
      .setTo([new Recipient(email, name)])
      .setSubject('Bienvenido')
      .setTemplateId(this.configService.get<string>('TEMPLATE_ID'))
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
      console.log('✅ Email sent successfully!');
    } catch (error) {
      throw new Error('Failed to send email: ' + error.message);
    }
  }
}
