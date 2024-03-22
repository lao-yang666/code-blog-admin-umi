// @ts-ignore
import { Request, Response } from 'express';

export default {
  'DELETE /store/order/:orderId': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
