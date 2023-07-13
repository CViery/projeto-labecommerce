import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function GetPurchase(req:Request, res: Response){
  try {
    const idSearch = req.params.id;
    const [resultPurchase] = await db
      .select(
        "purchase.id AS IDCompra",
        "purchase.buyer AS IDComprador",
        "user.name AS Cliente",
        "user.email AS EmailUsuario",
        "purchase.total_price AS ValorTotal",
        "purchase.createdAt AS DataDaCompra"
      )
      .from("purchases as purchase")
      .innerJoin("users as user", "purchase.buyer", "=", "user.id")
      .where("purchase.id", "=", idSearch);

    const resultPurchaseProducts = await db
      .select(
        "product.id",
        "product.name",
        "product.price",
        "product.description",
        "product.image_url AS imageUrl",
        "pp.quantity"
      )
      .from("purchases_products as pp")
      .innerJoin("products as product", "pp.product_id", "product.id")
      .where("pp.purchase_id", "=", idSearch);

    const result = {
      ...resultPurchase,
      products: resultPurchaseProducts,
    };

    res.status(200).json(result);
  } catch (error) {}
}