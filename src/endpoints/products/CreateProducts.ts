import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function createProducts(req: Request, res: Response) {
  try {
    const { id, name, price, description, image_url } = req.body;

    if (!id || !name || !price || !description || !image_url) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: 'Dados inválidos. Certifique-se de fornecer todos os campos necessários.' });
      return;
    }

    if (isNaN(Number(price))) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: 'O preço deve ser um valor numérico.' });
      return;
    }

    const existingProduct = await db('products').where('id', id).first();
    if (existingProduct) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: 'Já existe um produto cadastrado com o mesmo ID.' });
      return;
    }

    await db.insert({
      id: id,
      name: name,
      price: price,
      description: description,
      image_url: image_url,
    }).into('products');

    res.status(StatusCodes.OK).send({ message: 'Produto cadastrado com sucesso.' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Ocorreu um erro ao cadastrar o produto.' });
  }
}
