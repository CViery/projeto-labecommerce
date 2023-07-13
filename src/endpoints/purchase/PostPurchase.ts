import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';
import { PurchaseData, PurchaseProducts } from '../../types/types';

export async function createPurchase(req:Request, res: Response){
  try {
    const { id, buyer, products } = req.body;

    if (id == undefined || typeof id != "string" || id.length < 1) {
      res.statusCode = 400;
      throw new Error(`'id' é obrigatorio e precisa ter no minimo 2 caracteres`);
    }
    if (buyer == undefined || typeof buyer != "string" || buyer.length < 1) {
      res.statusCode = 400;
      throw new Error(`'buyer' é obrigatorio`);
    }
    if (products == undefined || products.length < 1) {
      res.statusCode = 400;
      throw new Error("compra incompleta, falta adicionar produtos");
    }
    const productsData = [];

    for (let product of products) {
      const [result] = await db("products").where({ id: product.id });
      if (!result) {
        throw new Error(`Produto ${product.id} nao encontrado`);
      }
      productsData.push(result);
    }
    const newPurchase: PurchaseData = {
      id: id,
      buyer: buyer,
      total_price: productsData.reduce(
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
    await db("purchases").insert(newPurchase);
    await db("purchases_products").insert(newPurchaseProducts);

    res.status(StatusCodes.CREATED).send({ message: "Pedido realizado com sucesso" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: error.message || JSON.stringify(error) });
  }
}