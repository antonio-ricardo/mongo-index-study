"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongodb_1 = require("mongodb");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
const client = new mongodb_1.MongoClient(`mongodb://${process.env.MONGO_DB_URL_NAME}:${process.env.MONGO_DB_URL_PASSWORD}@mongodb:27017/`);
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = client.db("toinDatabase");
    const collection = db.collection("Products");
    yield collection.insertOne({
        name: req.body.name,
        value: req.body.value,
        tag: 'CLOTHES'
    });
    const teste = yield collection.findOne({ name: req.body.name });
    return res.json({ message: teste ? teste.name : 'deu b.o' });
}));
app.get('/show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = client.db("toinDatabase");
    const collection = db.collection("Products");
    const products = yield collection.find({});
    return res.json({ products });
}));
app.get('/clean', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = client.db("toinDatabase");
    const collection = db.collection("Products");
    yield collection.deleteMany({});
    return res.json({ message: 'collection limpa' });
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log(`Rodando na porta ${port}`);
}));
