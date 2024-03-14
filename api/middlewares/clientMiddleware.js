const Cliente = require("../models/Client");

const clienteMiddleware = async (req, res, next) => {
  try {
    const clienteId = req.params.clienteId;
    const cliente = await Cliente.findById(clienteId);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    req.cliente = cliente;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = clienteMiddleware;
