const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
  university_name: { type: String, required: true, maxLength: 100 },
  university_eng_name: { type: String, required: false, maxLength: 100 },
  address: { type: String, required: false, maxLength: 100 },
});

// Virtual for author's URL
UniversitySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/university/${this._id}`;
});

// Export model
module.exports = University = mongoose.model("University", UniversitySchema);
