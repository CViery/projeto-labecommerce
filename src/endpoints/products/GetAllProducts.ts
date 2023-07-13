import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function GetAllProducts(req:Request, res: Response){

  try {

    const result = await db("products")

    res.status(StatusCodes.OK).send(result)

} catch (error) {
  
    res.send(StatusCodes.BAD_REQUEST).send(error)
}}