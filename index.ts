import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productModel from "./mongoose/product";

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  await productModel.create({
    name: req.body.name,
    value: req.body.value,
    tag: req.body.tag,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return res.json({ message: "criado com sucesso" });
});

app.get("/show", async (req, res) => {
  const products = await productModel.find();

  return res.json({ products });
});

app.get("/clean", async (req, res) => {
  await productModel.deleteMany({});

  return res.json({ message: "productModel limpa" });
});

app.listen(port, async () => {
  await mongoose.connect(
    `mongodb://${process.env.MONGO_DB_URL_NAME}:${process.env.MONGO_DB_URL_PASSWORD}@mongodb:27017/`
  );

  console.log(`Rodando na porta ${port}`);
});
