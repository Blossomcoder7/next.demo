/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

// const handlebarOptions: hbs.NodemailerExpressHandlebarsOptions = {
//   viewEngine: {
//     partialsDir: path.join(
//       process.cwd(),
//       "src",
//       "_services",
//       "emails",
//       "views"
//     ),
//     extname: ".hbs",
//     defaultLayout: false,
//   },
//   viewPath: path.join(process.cwd(), "src", "_services", "emails", "views"),
//   extName: ".hbs",
// };

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
  template: string; // e.g. "welcome"
  context: Record<string, any>;
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

  return new Promise((resolve, reject) => {
    try {
      const templatePath = path.join(
        process.cwd(),
        "src",
        "_services",
        "email",
        "views",
        `${mailOptions.template}.hbs`
      );

      const source = fs.readFileSync(templatePath, "utf8");
      const compiledTemplate = handlebars.compile(source);
      const html = compiledTemplate(mailOptions.context || {});

      transporter.sendMail(
        {
          from: `"Rahul Mehta" <blossom.reactdev02@gmail.com>`,
          cc: "blossom.reactdev02@gmail.com",
          to: mailOptions.to,
          subject: mailOptions.subject,
          html,
        },
        (error, info) => {
          if (error) {
            console.error("Error mailing user:", error);
            reject({ success: false, message: "Error mailing user", error });
          } else {
            console.log(
              `Email sent successfully. MessageID: ${info.messageId}, To: ${info.envelope.to}`
            );
            resolve({ success: true, message: "Mail sent successfully" });
          }
        }
      );
    } catch (error) {
      console.error("Template read/compile failed:", error);
      reject({ success: false, message: "Failed to render email", error });
    }
  });
};
export default transportEmail;
