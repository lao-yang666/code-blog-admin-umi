// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /store/order': (req: Request, res: Response) => {
    res.status(200).send({
      id: 83,
      petId: 85,
      quantity: 85,
      shipDate: '2001-03-14 05:55:30',
      status: 'placed',
      complete: true,
    });
  },
};
