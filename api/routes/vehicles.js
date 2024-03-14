const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Veiculo = require("../models/Vehicles");

const router = express.Router();

router.put("/editar/:id", async (req, res) => {
  try {
    const veiculoId = req.params.id;
    const { licensePlate, model } = req.body;

    // Verifica se o veículo com o ID fornecido existe
    const veiculo = await Veiculo.findById(veiculoId);
    if (!veiculo) {
      return res.status(404).json({ error: "Veículo não encontrado." });
    }

    // Atualiza os dados do veículo
    veiculo.licensePlate = licensePlate;
    veiculo.model = model;

    // Salva as alterações
    await veiculo.save();

    res.status(200).json({ message: "Veículo editado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para buscar veículos por placa e modelo
router.get("/buscar", async (req, res) => {
  try {
    const { licensePlate, model } = req.query;

    if (!licensePlate && !model) {
      return res.status(400).json({
        error:
          "É necessário fornecer ao menos um parâmetro de busca (placa ou modelo).",
      });
    }

    const queryObject = {};
    if (licensePlate)
      queryObject.licensePlate = { $regex: new RegExp(licensePlate, "i") };
    if (model) queryObject.model = { $regex: new RegExp(model, "i") };

    const veiculos = await Veiculo.find(queryObject);

    res.status(200).json(veiculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os veículos
router.get("/listar", async (req, res) => {
  try {
    const veiculos = await Veiculo.find();
    res.status(200).json(veiculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/cadastrar", async (req, res) => {
  try {
    const { licensePlate, model } = req.body;
    const veiculo = new Veiculo({ licensePlate, model });
    await veiculo.save();
    res.status(201).json({ message: "Veículo cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
