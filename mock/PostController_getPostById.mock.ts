// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /post/:id': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
