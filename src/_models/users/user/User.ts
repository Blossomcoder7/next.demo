import AddressSchema from "@/_models/generic/Address";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import transportEmail from "@/_services/email/email";
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    userType: { type: String, default: "user" },
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
    dob: { type: Date, default: undefined },
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
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName || ""} ${this.lastName || ""}`.trim();
});
UserSchema.pre("save", async function (next) {
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

UserSchema.post("save", async function () {
  const name =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any)?.fullName ||
    [this.firstName, this.lastName].filter(Boolean).join(", ");
  await transportEmail({
    mailOptions: {
      to: this.email,
      subject: "Greetings and Welcome",
      context: {
        fullName: name,
      },
      template: "welcome",
    },
  });
});

/**
 * Checks if the provided password matches the stored hash.
 * @param {string} plainPassword The password to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the password is correct, false otherwise.
 */
UserSchema.methods.matchPassword = async function (
  plainPassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result;
};

const UserModel =
  mongoose.models.user || mongoose.model("user", UserSchema, "users");
export default UserModel;
