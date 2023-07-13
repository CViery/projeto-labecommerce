import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';
import { PurchaseData, PurchaseProducts } from '../../types/types';

export async function createPurchase(req:Request, res: Response){
  try {
    const { id, buyer, products } = req.body;

    if (id == undefined || typeof id != "string" || id.length < 1) {
      res.statusCode = 400;
      throw new Error(`'id' is requerid, need to be the string type 
          and must heave at least one character`);
    }
    if (buyer == undefined || typeof buyer != "string" || buyer.length < 1) {
      res.statusCode = 400;
      throw new Error(`'buyer' is requirid, need to be the string type
          and must heave at least one character`);
    }
    if (products == undefined || products.length < 1) {
      res.statusCode = 400;
      throw new Error("incomplete purchase, missing products");
    }
    // ===========================================================================
    // verifica se o id e quantidade são válidos
    let invalidProductType: boolean = false;
    let invalidQuantity: boolean = false;

    for (let product of products) {
      if (product.id == undefined || typeof product.id != "string") {
        invalidProductType = true;
        break;
      } else {
        if (
          product.quantity == undefined ||
          typeof product.quantity != "number" ||
          product.quantity <= 0
        ) {
          invalidQuantity = true;
          break;
        }
      }
    }
    // produto com ID inválido
    if (invalidProductType) {
      res.statusCode = 400;
      throw new Error(
        "'id product' is requerid and need to be the string type"
      );
    }
    // produto com quanditade inválida
    if (invalidQuantity) {
      res.statusCode = 400;
      throw new Error(`'quantity' is requerid, need to be te number type 
           and must be greater than zero`);
    }
    // verifica se o cliente existe
    let [result] = await db("users").where({ id: buyer });
    if (!result) {
      res.statusCode = 400;
      throw new Error("'buyer' not registered");
    }
    // verifica se ja foi cadastrado esse id
    [result] = await db("purchases").where({ id: id });
    if (result) {
      res.statusCode = 400;
      throw new Error(`'purchase id' already registered`);
    }

    const productsFromDb = [];

    for (let product of products) {
      const [result] = await db("products").where({ id: product.id });
      if (!result) {
        throw new Error(`Produto ${product.id} nao encontrado`);
      }
      productsFromDb.push(result);
    }

    // cria o objeto da nova compra
    const newPurchase: PurchaseData = {
      id: id,
      buyer: buyer,
      total_price: productsFromDb.reduce(
        (accumulator, current) => accumulator + current.price,
        0
      ),
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    // criar o objeto do produtos
    const newPurchaseProducts: PurchaseProducts[] = [];

    for (let product of products) {
      const newProduct: PurchaseProducts = {
        product_id: product.id,
        purchase_id: id,
        quantity: product.quantity,
      };
      newPurchaseProducts.push(newProduct);
    }
    // salva do banco de dados a compra
    await db("purchases").insert(newPurchase);
    await db("purchases_products").insert(newPurchaseProducts);

    res.status(201).send({ message: "Pedido realizado com sucesso" });
  } catch (error: any) {
    res.status(400).send({ error: error.message || JSON.stringify(error) });
  }
}