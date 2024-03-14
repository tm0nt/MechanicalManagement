const mongoose = require("mongoose");
const OrdemServico = require("../models/Order");

const pagamentoSchema = new mongoose.Schema({
  ordemServico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrdemServico",
    required: true,
  },
  formaPagamento: {
    type: String,
    enum: ["avista", "parcelado"],
    required: true,
  },
  parcelas: {
    numeroParcelas: {
      type: Number,
      validate: {
        validator: function (value) {
          return this.formaPagamento !== "parcelado" || (value && value > 0);
        },
        message: "Número de parcelas deve ser maior que zero para pagamento parcelado.",
      },
    },
    parcelasAbertas: {
      type: Number,
      default: function () {
        return this.formaPagamento === "parcelado" ? this.parcelas.numeroParcelas : 0;
      },
    },
    valorParcela: {
      type: Number,
      validate: {
        validator: function (value) {
          return this.formaPagamento !== "parcelado" || (value && value > 0);
        },
        message: "Valor da parcela deve ser maior que zero para pagamento parcelado.",
      },
    },
  },
  valorTotal: {
    type: Number,
    required: [true, "O valor total é obrigatório."],
  },
  dataPagamento: {
    type: Date,
    default: null,
  },
});

const Pagamento = mongoose.model("Pagamento", pagamentoSchema);

module.exports = Pagamento;
