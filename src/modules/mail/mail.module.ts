import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { config } from 'dotenv';
import { smtpConfig } from 'src/configs/smtp.config';

config();
@Module({
  imports: [MailerModule.forRoot(smtpConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
