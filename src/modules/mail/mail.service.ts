import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailRejectAspiration(email: string) {
    return await this.mailerService.sendMail({
      to: email,
      subject: 'Đăng kí nguyện vọng không thành công',
      template: './rejectAspiration',
    });
  }

  async sendEmailRejectSwapRoom(email: string) {
    return await this.mailerService.sendMail({
      to: email,
      subject: 'Đăng kí đổi phòng không thành công',
      template: './rejectSwapRequest',
    });
  }
}
