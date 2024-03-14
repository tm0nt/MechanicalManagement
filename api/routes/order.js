const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const OrdemServico = require("../models/Order");
const Cliente = require("../models/Client");
const Produto = require("../models/Product");
const Pagamento = require("../models/Payment");

const router = express.Router();

router.get("/listar", async (req, res) => {
  try {
    const ordensServico = await OrdemServico.find().populate({
      path: 'cliente produto pagamento',
    });

    res.status(200).json(ordensServico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/fechar-ordem", async (req, res) => {
  try {
    const { ordemServicoId } = req.body;

    const ordemServico = await OrdemServico.findOne({ _id: ordemServicoId });

    if (!ordemServico) {
      return res.status(404).json({ error: "Ordem de Serviço não encontrada." });
    }

    ordemServico.status = "fechada";
    await ordemServico.save();

    res.status(200).json({ message: "Ordem de Serviço fechada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/buscar", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error: "É necessário fornecer um parâmetro de consulta (placa ou nome).",
      });
    }

    const ordensServico = await OrdemServico.find({
      $or: [
        { "cliente.specs.licensePlate": { $regex: new RegExp(query, "i") } },
        { "cliente.name": { $regex: new RegExp(query, "i") } },
      ],
    }).populate("cliente produto pagamento");

    res.status(200).json(ordensServico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/cadastrar", async (req, res) => {
  try {
    const { clienteId, produtoId, descricao, pagamento } = req.body;

    // Criar a ordem de serviço
    const ordemServico = new OrdemServico({
      descricao,
    });

    // Associar o cliente à ordem de serviço
    if (clienteId) {
      ordemServico.cliente = clienteId;
    }

    // Associar o produto à ordem de serviço
    if (produtoId) {
      ordemServico.produto = produtoId;
    }

    await ordemServico.save();

    // Adicionar o ID da ordem de serviço ao pagamento
    pagamento.ordemServico = ordemServico._id;
    const novoPagamento = new Pagamento(pagamento);
    await novoPagamento.save();

    res.status(201).json({ message: "Ordem de serviço e pagamento cadastrados com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
