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
import { db } from './dataBase/knex';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na casa do carai");
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
app.get("products",GetAllProducts)
//Editar Produtos pelo id
app.put("/product/:id",updateProducts);
//cadastrar compra
app.post("/purchase",createPurchase);
//Deletar compra
app.delete("/purchases/:id", DeletePurchase);
//Ver compra pelo id
app.get("/purchases/:id", GetPurchase);

app.get("/teste", async (req:Request, res: Response)=>{
  try {
    const [DadosComprador] = await db.select(
      "users.name as name",
      "created_at as dataCompra",
      "total_price as ValorTotal"
      ).from("purchase").innerJoin("users", "purchases.buyer", "=", "users.id" );
      const [DadosProduto] = await db.select(
        "product.name","product.price", "quantity"
      ).from("purchase_products").innerJoin("products","purchase_product.product_id", "=", "product.id" )
      const result = [DadosComprador, DadosProduto]
      res.send(DadosComprador)
  } catch (error) {
    
  }
})