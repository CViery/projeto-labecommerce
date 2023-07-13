import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function createProducts(req:Request, res: Response){
  try {

    const{id, name, price,description,image_url} = req.body

    if (!id || !name || isNaN(price) || !description || !image_url) {

      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Dados Invalidos");
    }

    await db.insert({
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: image_url,
      }).into("products");

    res.status(StatusCodes.OK).send({ message: "Produto cadastrado com sucesso" });

  } catch (error) {
    
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
}

