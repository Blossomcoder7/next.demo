import transportEmail from "@/_services/email/email";
import mongoose from "mongoose";

const { Schema } = mongoose;
const ContactUsSchema = new Schema(
  {
    name: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    message: { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true },
    replied: { type: Boolean, default: false },
    converted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ContactUsSchema.post("save", async function (doc) {
  if (doc.replied) {
    return;
  } else {
    try {
      transportEmail({
        mailOptions: {
          to: doc.email,
          context: {
            name: doc.name,
            email: doc.email,
            subject: doc.subject,
            message: doc.message,
          },
          subject: "Thanks for the submission, We will get back to you soon.",
          template: "thanks",
        },
      })
        .catch((err) => console.log({ err }))
        .then((res: any) => {
          console.log({ res });
          if (res.success) {
            doc.replied = true;
            doc.save();
          }
        });
    } catch (error) {
      console.log(`Error while replying a contact us form submission ${error}`);
    }
  }
});

const ContactUsModel =
  mongoose.models?.contact ||
  mongoose.model("contact", ContactUsSchema, "contacts");
export default ContactUsModel;
