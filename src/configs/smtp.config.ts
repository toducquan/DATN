import { MailerOptions } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'dotenv';

config();
export const smtpConfig: MailerOptions = {
  transport: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: '36a91c663d1303',
      pass: 'ec4833cef8184a',
    },
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
  template: {
    dir: join(__dirname, '../modules/mail/templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
