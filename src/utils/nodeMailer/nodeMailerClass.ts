import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable(
)
export class MailService{
    constructor(private readonly configService: ConfigService){}
    
    private transporter = nodemailer.createTransport({
        host: this.configService.get<string>('MAIL_HOST'),
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASS'),
        },
      });

     // async..await is not allowed in global scope, must use a wrapper
    async sendResetPasswordMail(toEmail:string, subject: string = "TEST") {
    // send mail with defined transport object
    const info = await this.transporter.sendMail({
      from: {name: this.configService.get<string>('APP_NAME') , address: this.configService.get<string>('DEFAULT_MAIL_FROM') }, // sender address
      to: toEmail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
}
