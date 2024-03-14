const mongoose = require("mongoose");

const ordemServicoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: false,
  },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    required: false,
  },
  status: {
    type: String,
    enum: ['open', 'closed'], 
    default: 'open',
  },
  descricao: { type: String, required: true },
  pagamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pagamento",
    required: false,
  },
});

const OrdemServico = mongoose.model("OrdemServico", ordemServicoSchema);

module.exports = OrdemServico;
