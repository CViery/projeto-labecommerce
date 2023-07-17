import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../dataBase/knex';
import { PurchaseData, PurchaseProducts } from '../../types/types';

export async function createPurchase(req: Request, res: Response) {
  try {
    const { id, buyer, products } = req.body;

    if (!id || typeof id !== 'string' || id.length < 2) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "'id' é obrigatório e precisa ter no mínimo 2 caracteres." });
      return;
    }
    if (!buyer || typeof buyer !== 'string' || buyer.length < 1) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "'buyer' é obrigatório." });
      return;
    }
    if (!products || products.length < 1) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Compra incompleta, é necessário adicionar produtos." });
      return;
    }

    const productsData: any[] = [];

    for (const product of products) {
      const [result] = await db('products').where({ id: product.id });
      if (!result) {
        throw new Error(`Produto ${product.id} não encontrado.`);
      }
      productsData.push(result);
    }

    const total_price = productsData.reduce((accumulator, current) => accumulator + current.price, 0);
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const newPurchase: PurchaseData = {
      id: id,
      buyer: buyer,
      total_price: total_price,
      created_at: created_at,
    };

    const newPurchaseProducts: PurchaseProducts[] = [];

    for (const product of products) {
      const newProduct: PurchaseProducts = {
        product_id: product.id,
        purchase_id: id,
        quantity: product.quantity,
      };
      newPurchaseProducts.push(newProduct);
    }

    await db('purchases').insert(newPurchase);
    await db('purchases_products').insert(newPurchaseProducts);

    res.status(StatusCodes.CREATED).send({ message: 'Pedido realizado com sucesso.' });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: error.message || JSON.stringify(error) });
  }
}
