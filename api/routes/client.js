const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Cliente = require("../models/Client");
const OrdemServico = require("../models/Order");

const router = express.Router();

// Rota para buscar clientes por placa ou nome
router.get("/buscar", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error:
          "É necessário fornecer um parâmetro de consulta (placa ou nome).",
      });
    }

    const clients = await Cliente.find({
      $or: [
        { name: { $regex: new RegExp(query, "i") } },
        { "specs.licensePlate": { $regex: new RegExp(query, "i") } },
      ],
    });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/listar", async (req, res) => {
  try {
    const clientsWithOrders = await Cliente.aggregate([
      {
        $lookup: {
          from: "ordens_servicos",
          let: { clientId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$cliente", "$$clientId"] },
              },
            },
          ],
          as: "ordensServico",
        },
      },
    ]);

    res.status(200).json(clientsWithOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/cadastrar", async (req, res) => {
  try {
    const {
      name,
      lastname,
      email,
      phone,
      specs: { licensePlate, model },
      address: { street, city, state, zipCode },
    } = req.body;

    const cliente = new Cliente({
      name,
      lastname,
      email,
      phone,
      specs: { licensePlate, model },
      address: { street, city, state, zipCode },
    });

    await cliente.save();
    res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
