// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /monster/list': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
