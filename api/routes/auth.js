const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const { newPassword } = req.body;

    // Encontre o primeiro usuário no banco de dados
    const user = await User.findOne();

    // Verifique se o usuário existe
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Criptografe a nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualize a senha do usuário no banco de dados
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ userId: user._id }, "secretpassword", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

module.exports = router;
