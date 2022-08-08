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
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./mongoose/product"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_1.default.create({
        name: req.body.name,
        value: req.body.value,
        tag: "CLOTHES",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const teste = yield product_1.default.findOne({ name: req.body.name });
    return res.json({ message: teste ? teste.name : "deu b.o" });
}));
app.get("/show", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find();
    const teste = yield product_1.default.findOne({ name: "toin" });
    return res.json({ products, teste });
}));
app.get("/clean", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_1.default.deleteMany({});
    return res.json({ message: "productModel limpa" });
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`mongodb://${process.env.MONGO_DB_URL_NAME}:${process.env.MONGO_DB_URL_PASSWORD}@mongodb:27017/`);
    console.log(`Rodando na porta ${port}`);
}));
