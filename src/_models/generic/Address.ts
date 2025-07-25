import mongoose from "mongoose";

const { Schema } = mongoose;
const AddressSchema = new Schema(
  {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    pin: { type: String, default: "" },
    country: { type: String, default: "" },
    countryCode: { type: String, default: "" },
    countryPhoneCode: { type: String, default: "" },
    fullAddress: { type: String, default: "" },
  },
  {
    _id: false,
    timestamps: false,
  }
);

export default AddressSchema;
