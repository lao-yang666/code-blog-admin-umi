// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /user/detail/:id': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
