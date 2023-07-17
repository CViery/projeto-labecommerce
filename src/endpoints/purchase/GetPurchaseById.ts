import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function GetPurchase(req: Request, res: Response) {
  try {
    const idSearch = req.params.id;

    if (!idSearch || isNaN(Number(idSearch))) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: 'O ID de compra fornecido é inválido.' });
      return;
    }

    const [resultPurchase] = await db
      .select(
        'purchases.id AS IDCompra',
        'purchases.buyer AS IDComprador',
        'users.name AS Cliente',
        'users.email AS EmailUsuario',
        'purchases.total_price AS ValorTotal',
        'purchases.created_at AS DataDaCompra'
      )
      .from('purchases')
      .innerJoin('users', 'purchases.buyer', '=', 'users.id')
      .where('purchases.id', '=', idSearch);

    if (!resultPurchase) {
      res.status(StatusCodes.NOT_FOUND).send({ error: 'Compra não encontrada.' });
      return;
    }

    const resultPurchaseProducts = await db
      .select(
        'products.id',
        'products.name',
        'products.price',
        'products.description',
        'products.image_url AS imageUrl',
        'purchases_products.quantity as quantidade'
      )
      .from('purchases_products')
      .innerJoin('products', 'product_id', '=', 'products.id')
      .where('purchase_id', '=', idSearch);

    const result = {
      ...resultPurchase,
      products: resultPurchaseProducts,
    };

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Ocorreu um erro ao buscar a compra.' });
  }
}
