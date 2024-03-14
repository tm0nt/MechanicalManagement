const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model("empresa", companySchema);

module.exports = Company;
