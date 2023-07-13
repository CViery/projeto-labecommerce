import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function ProductsByName(req:Request, res: Response){
  try {
    const name = req.query.name;
    const [products] = await db
      .select("*")
      .from("products")
      .where({ name: name });

    res.status(StatusCodes.OK).send(products);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
}