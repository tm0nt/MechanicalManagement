const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Produto = require("../models/Product");

const router = express.Router();

// Rota para buscar produtos por nome
router.get("/buscar", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error:
          "É necessário fornecer um parâmetro de consulta (nome do produto).",
      });
    }

    const produtos = await Produto.find({
      name: { $regex: new RegExp(query, "i") },
    });

    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/listar", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/cadastrar", async (req, res) => {
  try {
    const { name, value, quantity } = req.body;
    const produto = new Produto({ name, value, quantity });
    await produto.save();
    res.status(201).json({ message: "Produto cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/editar/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, value, quantity } = req.body;

    // Verifica se o produto com o ID fornecido existe
    const produto = await Produto.findById(productId);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    // Atualiza os dados do produto
    produto.name = name;
    produto.value = value;
    produto.quantity = quantity;

    // Salva as alterações
    await produto.save();

    res.status(200).json({ message: "Produto editado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para deletar um produto por ID
router.delete("/deletar/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Verifica se o produto com o ID fornecido existe
    const produto = await Produto.findById(productId);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    // Deleta o produto
    await Produto.findByIdAndDelete(productId);

    res.status(200).json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
