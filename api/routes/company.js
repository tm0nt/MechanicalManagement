const express = require("express");
const Company = require("../models/About");

const router = express.Router();

// Rota para listar informações da empresa
router.get("/about", async (req, res) => {
  try {
    const companyInfo = await Company.findOne();
    res.status(200).json(companyInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { companyName, phone, address, postCode, email } = req.body;
    const existingCompany = await Company.findOne();

    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company already registered. Use /about to update." });
    }

    const newCompany = new Company({
      companyName,
      phone,
      address,
      postCode,
      email,
    });
    await newCompany.save();

    res.status(201).json({ message: "Company registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar informações da empresa
router.put("/about", async (req, res) => {
  try {
    const updatedCompanyInfo = await Company.findOneAndUpdate({}, req.body, {
      new: true,
    });
    res.status(200).json(updatedCompanyInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
