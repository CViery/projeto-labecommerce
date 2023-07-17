import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function createUsers(req: Request, res: Response) {
  try {
    const { id, name, email, password } = req.body;

    if (!id || typeof id !== 'string' || id.length < 1) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "'id' é obrigatório e precisa ter pelo menos 1 caracter." });
      return;
    }
    if (!name || typeof name !== 'string' || name.length < 1) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "'name' é obrigatório." });
      return;
    }
    if (!email || typeof email !== 'string' || email.length < 1) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "'email' é obrigatório." });
      return;
    }

    await db.insert({
      id: id,
      name: name,
      email: email,
      password: password,
    }).into('users');

    res.status(StatusCodes.OK).send({ message: 'Cadastro realizado com sucesso.' });

  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Ocorreu um erro ao criar o usuário." || JSON.stringify(error) });
  }
}
