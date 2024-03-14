const express = require("express");
const router = express.Router();
const OrdemServico = require("../models/Order");
const Pagamento = require("../models/Payment");

// Rota para listar todos os pagamentos
router.get("/listar", async (req, res) => {
  try {
    const pagamentos = await Pagamento.find().populate("ordemServico");

    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para exibir um pagamento com base no ID da ordem de serviço
router.get("/exibir/:ordemServicoId", async (req, res) => {
  try {
    const ordemServicoId = req.params.ordemServicoId;

    const pagamento = await Pagamento.findOne({ ordemServico: ordemServicoId }).populate("ordemServico");

    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado para esta ordem de serviço." });
    }

    res.status(200).json(pagamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para pagar parcelas
router.post("/pagar-parcelas", async (req, res) => {
  try {
    const { ordemServicoId, quantidadeParcelas } = req.body;

    const pagamento = await Pagamento.findOne({ ordemServico: ordemServicoId });

    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado para esta ordem de serviço." });
    }

    if (pagamento.formaPagamento !== "parcelado") {
      return res.status(400).json({ error: "Este pagamento não é parcelado." });
    }

    if (quantidadeParcelas <= 0 || quantidadeParcelas > pagamento.parcelas.numeroParcelas) {
      return res.status(400).json({ error: "Quantidade de parcelas inválida." });
    }

    if (quantidadeParcelas <= pagamento.parcelas.parcelasAbertas) {
      pagamento.parcelas.parcelasAbertas -= quantidadeParcelas;
      pagamento.valorTotalPago += quantidadeParcelas * pagamento.parcelas.valorParcela;
      pagamento.dataPagamento = new Date();
    } else {
      return res.status(400).json({ error: "Quantidade de parcelas a pagar excede o disponível." });
    }

    await pagamento.save();

    res.status(200).json({ message: "Parcelas pagas com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
