import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function DeletePurchase(req:Request, res: Response){
  try {
    const idToDelete = req.params.id;
    const [purchase] = await db("purchases").where({ id: idToDelete });

    if (!purchase) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("'id' Não Encontrado");
    }
    await db("purchases").del().where({ id: idToDelete });
    res.status(StatusCodes.OK).send({ message: "Compra Deletado" });
  } catch (error) {}
}