import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function ProductsByName(req: Request, res: Response) {
  try {
    const name = req.query.name;

    if (!name) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: 'O parâmetro "name" é obrigatório.' });
      return;
    }

    const products = await db
      .select('*')
      .from('products')
      .where({ name: name });

    if (!products || products.length === 0) {
      res.status(StatusCodes.NOT_FOUND).send({ error: 'Não foram encontrados produtos com o nome fornecido.' });
      return;
    }

    res.status(StatusCodes.OK).send(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Ocorreu um erro ao buscar os produtos.' });
  }
}
