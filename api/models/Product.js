const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = Produto;
