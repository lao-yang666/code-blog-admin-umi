// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /store/order/:orderId': (req: Request, res: Response) => {
    res.status(200).send({
      id: 89,
      petId: 78,
      quantity: 63,
      shipDate: '1999-08-22 21:35:38',
      status: 'placed',
      complete: false,
    });
  },
};
