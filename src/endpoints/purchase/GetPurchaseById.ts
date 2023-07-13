import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function GetPurchase(req:Request, res: Response){
  try {
    const idSearch = req.params.id;
    console.log('ID de pesquisa:', idSearch);

    const [resultPurchase] = await db
      .select(
        "purchases.id AS IDCompra",
        "purchases.buyer AS IDComprador",
        "users.name AS Cliente",
        "users.email AS EmailUsuario",
        "purchases.total_price AS ValorTotal",
        "purchases.created_at AS DataDaCompra"
      )
      .from("purchases")
      .innerJoin("users", "purchases.buyer", "=", "users.id")
      .where("purchases.id", "=", idSearch);

    console.log('Resultado da compra:', resultPurchase);

    const resultPurchaseProducts = await db
      .select(
        "products.id",
        "products.name",
        "products.price",
        "products.description",
        "products.image_url AS imageUrl",
        "purchases_products.quantity as quantidade"
      )
      .from("purchases_products")
      .innerJoin("products", "product_id","=", "products.id")
      .where("purchase_id", "=", idSearch);

    console.log('Produtos da compra:', resultPurchaseProducts);

    const result = {
      ...resultPurchase,
      products: resultPurchaseProducts,
    };

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Erro ao buscar compra:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Ocorreu um erro ao buscar a compra.' });
  }
}
