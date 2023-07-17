import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function getAllUsers(req: Request, res: Response) {
  try {
    const result = await db('users');

    if (result.length === 0) {
      res.status(StatusCodes.NOT_FOUND).send({ error: 'Nenhum usuário encontrado.' });
      return;
    }

    res.status(StatusCodes.OK).send(result);

  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: 'Ocorreu um erro ao buscar os usuários.' });
  }
}
