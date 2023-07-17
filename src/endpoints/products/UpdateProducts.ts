import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function updateProducts(req: Request, res: Response) {
  try {
    const idToEdit = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImage = req.body.image_url;

    if (newId !== undefined) {
      if (typeof newId !== 'string') {
        res.status(StatusCodes.BAD_REQUEST).send({ error: "'id' deve ser uma string." });
        return;
      }
      if (newId.trim().length < 1) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: "'id' deve possuir pelo menos um caractere." });
        return;
      }
    }

    const existingProduct = await db('products').where({ id: idToEdit }).first();
    if (!existingProduct) {
      res.status(StatusCodes.NOT_FOUND).send({ error: "'id' não encontrado." });
      return;
    }

    const updatedProduct = {
      id: newId || existingProduct.id,
      name: newName || existingProduct.name,
      price: newPrice !== undefined ? (isNaN(newPrice) ? existingProduct.price : newPrice) : existingProduct.price,
      description: newDescription || existingProduct.description,
      image_url: newImage || existingProduct.image_url,
    };

    await db('products').where({ id: idToEdit }).update(updatedProduct);

    res.status(StatusCodes.OK).send({ message: 'Atualização realizada com sucesso.' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: 'Erro ao atualizar o produto.' });
  }
}
