import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function DeletePurchase(req: Request, res: Response) {
  try {
    const idToDelete = req.params.id;

    // Verificar se a compra existe
    const existingPurchase = await db('purchases').where('id', idToDelete).first();
    if (!existingPurchase) {
      res.status(StatusCodes.NOT_FOUND).send({ error: 'Compra não encontrada.' });
      return;
    }

    // Excluir os registros relacionados na tabela purchases_products
    await db('purchases_products').where('purchase_id', idToDelete).del();

    // Excluir a compra
    await db('purchases').where('id', idToDelete).del();

    res.status(StatusCodes.OK).send({ message: 'Compra deletada com sucesso.' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Ocorreu um erro ao deletar a compra.' });
  }
}
