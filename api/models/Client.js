const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  specs: {
    licensePlate: { type: String, required: true, unique: true },
    model: { type: String, required: true },
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
