import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';

export async function DeletePurchase(req:Request, res: Response){
  try {
    const idToDelete = req.params.id;
    console.log('ID para deletar:', idToDelete);
    await db("purchases_products").where("purchase_id", idToDelete).del();
    console.log('Registros relacionados em purchases_products excluídos com sucesso.');
    await db("purchases").where("id", idToDelete).del();
    console.log('Compra deletada com sucesso.');
    res.status(StatusCodes.OK).send({ message: "Compra Deletada" });
  } catch (error) {
    console.error('Erro ao deletar compra:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Ocorreu um erro ao deletar a compra.' });
  }
}
