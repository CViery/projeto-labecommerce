import express, { Request, Response } from "express";
import cors from "cors";
import { getAllUsers } from './endpoints/users/GetAllUsers';
import { createUsers } from './endpoints/users/CreateUser';
import { createProducts } from './endpoints/products/CreateProducts';
import { ProductsByName } from './endpoints/products/GetProductsName';
import { GetAllProducts } from './endpoints/products/GetAllProducts';
import { updateProducts } from './endpoints/products/UpdateProducts';
import { createPurchase } from './endpoints/purchase/PostPurchase';
import { DeletePurchase } from './endpoints/purchase/DeletePurchase';
import { GetPurchase } from './endpoints/purchase/GetPurchaseById';


const PORT = 3003
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor Rodando em https://localhost:${PORT}`);
});
//Ver todos os usuarios
app.get("/users", getAllUsers);

// cadastrar usuario
app.post("/user", createUsers);

// cadastrar produtos
app.post("/products", createProducts);

//Pesquisar produto por nome
app.get("/products/search", ProductsByName);

//Pesquisar todos os produtos
app.get("/products", GetAllProducts);

//Editar Produtos pelo id
app.put("/product/:id",updateProducts);

//cadastrar compra
app.post("/purchase",createPurchase);

//Deletar compra
app.delete("/purchases/:id", DeletePurchase);

//Ver compra pelo id
app.get("/purchases/:id", GetPurchase);
