const mongoose = require("mongoose");

const disasterSchema = new mongoose.Schema({
  Entity: {
    type: String,
    default: "All disasters",
  },
  Code: {
    type: String,
    default: "",
  },
  Year: {
    type: Number,
    required: true,
  },
  Disasters: {
    type: Number,
    required: true,
  },
});

// Optional: Add a method to summarize disaster counts
disasterSchema.methods.summary = function () {
  return `Year ${this.year}: ${this.disasters} disasters`;
};

// Static method to find disasters by year
disasterSchema.statics.findByYear = function (year) {
  return this.find({ year });
};

const Disaster = mongoose.model("Disaster", disasterSchema);
module.exports = Disaster;
