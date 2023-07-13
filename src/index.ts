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
app.get("/products", GetAllProducts)
//Editar Produtos pelo id
app.put("/product/:id",updateProducts);
//cadastrar compra
app.post("/purchase",createPurchase);
//Deletar compra
app.delete("/purchases/:id", DeletePurchase);
//Ver compra pelo id
app.get("/purchases/:id", GetPurchase);

app.get("/teste/:id", async (req, res) => {
  try {
    const idSearch = req.params.id; 
    /* console.log("ID de pesquisa:", idSearch) */; // Log do ID de pesquisa

    const dados = await db
      .select(
        "purchases.id as idCompra",
        "users.name as Cliente",
        "users.email as EmailCliente",
        "products.name as Item",
        "products.price as ValorDoItem",
        "quantity",
        "purchases.total_price as ValorTotalDaCompra",
        "purchases.created_at as Data"
      )
      .from("purchases_products")
      .innerJoin("products", "product_id", "=", "products.id")
      .innerJoin("purchases", "purchase_id", "=", "purchases.id")
      .innerJoin("users", "purchases.buyer", "=", "users.id").where({purchase_id :idSearch});

    console.log("Dados encontrados:", dados); // Log dos dados encontrados

    if (dados.length > 0) {
      res.send(dados);
      console.log("Resposta enviada:", dados); // Log da resposta enviada
    } else {
      res.status(404).send("Nenhum dado encontrado com o ID fornecido.");
      console.log("Resposta de erro enviada."); // Log da resposta de erro enviada
    }
  } catch (error) {
    console.error("Erro ao processar solicitação:", error); // Log do erro
    res.status(500).send("Ocorreu um erro ao processar a solicitação.");
  }
});
