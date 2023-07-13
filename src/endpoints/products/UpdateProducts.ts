import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function updateProducts(req:Request, res: Response){
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImage = req.body.image_url;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("'id' deve ser um number");
      }
      if (newId.length < 1) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("'id' deve possuir no minimo um caracter");
      }
    }
    const [product] = await db("products").where({ id: idToEdit });
    if (product) {
      const updateProduct = {
        id: newId || product.id,
        name: newName || product.name,
        price: isNaN(newPrice) ? product.price : newPrice,
        description: newDescription || product.description,
        image_url: newImage || product.imageUrl,
      };
      await db("products").where({ id: idToEdit }).update(updateProduct);
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("'id' não encontrado");
    }
    res.status(StatusCodes.OK).send("Atualização realizada com sucesso");
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send("erro");
  }
}