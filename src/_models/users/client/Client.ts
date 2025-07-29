import AddressSchema from "@/_models/generic/Address";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import transportEmail from "@/_services/email/email";
const { Schema } = mongoose;
const ClientSchema = new Schema(
  {
    userType: { type: String, default: "client" },
    userName: { type: String, default: undefined },
    password: { type: String, default: undefined },
    // personals
    firstName: {
      type: String,
      default: "",
      trim: true,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      default: "",
      trim: true,
      required: [true, "Last name is required"],
    },
    age: { type: Number, default: undefined },
    dob: { type: Date, default: undefined, trim: true },
    avatar: { type: String, default: undefined },
    provider: { type: String, default: undefined },
    //contacts
    email: {
      type: String,
      default: "",
      lowercase: true,
      unique: true,
      trim: true,
    },
    phone: { type: String, default: "" },
    address: {
      type: AddressSchema,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

ClientSchema.set("toJSON", { virtuals: true });
ClientSchema.set("toObject", { virtuals: true });
ClientSchema.virtual("fullName").get(function () {
  return `${this.firstName || ""} ${this.lastName || ""}`.trim();
});
ClientSchema.pre("save", async function (next) {
  const address = this.address;
  if (address) {
    const { street = "", city = "", country = "", pin = "" } = address;
    const parts = [street, city, country, pin].filter(Boolean);
    address.fullAddress = parts.join(", ");
  }
  const password = this.password;
  if (password) {
    const salt = await bcrypt.genSalt(Number(process.env.ENC_LAYERS) || 10);
    const hash = await bcrypt.hash(password, salt);
    this.password = hash;
  }
  const { firstName, lastName } = this;
  this.userName =
    firstName?.substring(0, 3) + "_" + lastName?.substring(0, 2) + Date.now();
  next();
});

ClientSchema.post("save", async function () {
  const name =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any)?.fullName ||
    [this.firstName, this.lastName].filter(Boolean).join(", ");
  transportEmail({
    mailOptions: {
      to: this.email,
      subject: "Greetings and Welcome as a partner",
      context: {
        fullName: name,
      },
      template: "welcome",
    },
  }).catch((error) => {
    console.log(error);
  });
});

/**
 * Checks if the provided password matches the stored hash.
 * @param {string} plainPassword The password to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the password is correct, false otherwise.
 */
ClientSchema.methods.matchPassword = async function (
  plainPassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result;
};
const ClientModel =
  mongoose.models.client || mongoose.model("client", ClientSchema);
export default ClientModel;
