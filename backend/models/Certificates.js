const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  university: {
    type: Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  collage_name: { type: String, required: true, maxLength: 100 },
  gpa: { type: String, required: true, maxLength: 4 },
  graduate_date: { type: Date },
  //   issue_date: { type: Date },
});

// Virtual for author's URL
CertificateSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/certificate/${this._id}`;
});

// Export model
module.exports = Certificate = mongoose.model("Certificate", CertificateSchema);
