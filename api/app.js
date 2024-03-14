const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/auth");
const produtoRoutes = require("./routes/product");
const veiculoRoutes = require("./routes/vehicles");
const ordemServicoRoutes = require("./routes/order");
const clienteRoutes = require("./routes/client");
const empresaRoutes = require("./routes/company");
const pagamentosRoutes = require("./routes/payment");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const username = "oficina";
const password = "oficina";
const databaseName = "oficina";
const host = "191.96.251.10";

mongoose.connect(`mongodb://191.96.251.10:27017/oficina`, {
  useNewUrlParser: true,
});

const Cliente = require("./models/Client");
const Veiculo = require("./models/Vehicles");
const OrdemServico = require("./models/Order");
const Pagamento = require("./models/Payment");
const Company = require("./models/About");

app.use("/auth", authRoutes);
app.use("/produtos", produtoRoutes);
app.use("/veiculos", veiculoRoutes);
app.use("/ordens", ordemServicoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/company", empresaRoutes);
app.use("/pagamentos", pagamentosRoutes);


// Rota para obter estatísticas
app.get("/", async (req, res) => {
  try {
    const quantidadeOrdens = await OrdemServico.countDocuments();
    const quantidadeClientes = await Cliente.countDocuments();
    const quantidadeVeiculos = await Veiculo.countDocuments();
    const quantidadePagamentosEmAberto = await Pagamento.countDocuments({
      status: "Em Aberto",
    });

    const companyInfo = await Company.findOne();

    res.status(200).json({
      quantidadeOrdens,
      quantidadeClientes,
      quantidadeVeiculos,
      quantidadePagamentosEmAberto,
      companyInfo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
