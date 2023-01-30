import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailRejectAspiration(email: string) {
    return await this.mailerService.sendMail({
      to: email,
      subject: 'Em den lam',
      template: './rejectAspiration',
    });
  }

  async sendEmailRejectSwapRoom(email: string) {
    return await this.mailerService.sendMail({
      to: email,
      subject: 'Em den lam',
      template: './rejectSwapRequest',
    });
  }
}
