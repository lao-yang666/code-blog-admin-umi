// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /user/list': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
