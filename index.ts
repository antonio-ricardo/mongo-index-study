import express from "express";
import 'dotenv/config'
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.json());

const client = new MongoClient(
  `mongodb://${process.env.MONGO_DB_URL_NAME}:${process.env.MONGO_DB_URL_PASSWORD}@mongodb:27017/`
);


app.post("/", async (req, res) => {
  const db = client.db("toinDatabase");
  const collection = db.collection("Products");

  await collection.insertOne({
    name: req.body.name,
    value: req.body.value,
    tag: 'CLOTHES'
  })

  const teste = await collection.findOne({ name: req.body.name });
  return res.json({ message: teste ? teste.name : 'deu b.o' });
});

app.get('/show', async(req, res) => {
  const db = client.db("toinDatabase");
  const collection = db.collection("Products");

  const products = await collection.find({})

  return res.json({products})
})

app.get('/clean', async (req, res) => {
  const db = client.db("toinDatabase");
  const collection = db.collection("Products");

  await collection.deleteMany({})

  return res.json({message: 'collection limpa'})
})

app.listen(port, async () => {
  await client.connect();

  console.log(`Rodando na porta ${port}`);
});
