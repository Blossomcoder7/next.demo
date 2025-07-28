/* eslint-disable @typescript-eslint/no-explicit-any */
import SMTPTransport from "nodemailer/lib/smtp-transport";
import path from "node:path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

const handlebarOptions: hbs.NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.join(
      process.cwd(),
      "src",
      "_services",
      "emails",
      "views"
    ),
    extname: ".hbs",
    defaultLayout: false,
  },
  viewPath: path.join(process.cwd(), "src", "_services", "emails", "views"),
  extName: ".hbs",
};

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT ? Number(SMTP_PORT) : undefined,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
} as SMTPTransport.Options);

interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context: any;
}
/**
 * @function transportEmail
 * @description Transport email using nodemailer
 * @param {Object} params - parameters
 * @param {MailOptions} params.mailOptions - mail options
 * @returns {Promise<{success: boolean, message: string, error?: Error}>} - promise with success, message, and error (if any)
 */
const transportEmail = async ({
  mailOptions,
}: {
  mailOptions: MailOptions;
}) => {
  console.log("Email - transporter starting task", {
    to: mailOptions?.to,
    sub: mailOptions.subject,
    template: mailOptions.template,
  });

  transporter.use("compile", hbs(handlebarOptions));
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: `"Rahul Mehta" <blossom.reactdev02@gmail.com>`,
        cc: "blossom.reactdev02@gmail.com",
        ...mailOptions,
      },
      (error, info) => {
        if (error) {
          console.error("Error mailing user:", error);
          reject({ success: false, message: "Error mailing user", error });
        } else {
          console.log(
            `Email sent successfully,${info} MessageID: ${info.messageId}, To: ${info.envelope.to}`
          );
          resolve({ success: true, message: "Mail sent successfully" });
        }
      }
    );
  });
};

export default transportEmail;
