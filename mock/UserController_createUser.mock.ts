// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/new': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
