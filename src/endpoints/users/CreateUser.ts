import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function createUsers(req:Request, res: Response) {
  try {
    const {id,name,email,password}= req.body 
    if (!id || !name || !email) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Dados Invalidos");
    }
    await db.insert({
        id: id,
        name: name,
        email: email,
        password: password,
      }).into("users");

    res.status(StatusCodes.OK).send({ message: "Cadastro Realizado com sucesso" });

  } catch (error) {
    
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
}