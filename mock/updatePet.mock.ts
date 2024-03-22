// @ts-ignore
import { Request, Response } from 'express';

export default {
  'PUT /pet': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
