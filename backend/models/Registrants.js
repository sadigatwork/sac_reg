const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegistrantSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  second_name: { type: String, required: true, maxLength: 100 },
  third_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  nss_type: {
    type: String,
    required: true,
    enum: ["NSS", "جواز", "رخصة قيادة"],
    default: "NSS",
  },
  nss: { type: String, required: true, maxLength: 20 },
  certificate: {
    type: Schema.Types.ObjectId,
    ref: "Certificate",
    required: true,
  },
  date_of_birth: { type: Date },
});

// Virtual for author's full name
RegistrantSchema.virtual("full_name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (
    this.first_name &&
    this.second_name &&
    this.third_name &&
    this.last_name
  ) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
RegistrantSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/registrant/${this._id}`;
});

// Export model
module.exports = Registrant = mongoose.model("Registrant", RegistrantSchema);
