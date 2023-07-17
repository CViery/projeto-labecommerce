import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function GetAllProducts(req: Request, res: Response) {
  try {
    const products = await db('products');

    if (!products || products.length === 0) {
      res.status(StatusCodes.NOT_FOUND).send({ error: 'Não foram encontrados produtos.' });
      return;
    }

    res.status(StatusCodes.OK).send(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Ocorreu um erro ao buscar os produtos.' });
  }
}
