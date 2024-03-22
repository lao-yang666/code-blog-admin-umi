// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /store/inventory': (req: Request, res: Response) => {
    res.status(200).send({ additionalProp1: 100, additionalProp2: 69, additionalProp3: 94 });
  },
};
