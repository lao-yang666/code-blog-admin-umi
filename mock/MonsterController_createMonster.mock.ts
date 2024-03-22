// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /monster/new': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
