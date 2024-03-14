const mongoose = require("mongoose");

const veiculoSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  model: { type: String, required: true },
});

const Veiculo = mongoose.model("veiculos", veiculoSchema);

module.exports = Veiculo;
