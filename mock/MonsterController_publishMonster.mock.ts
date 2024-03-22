// @ts-ignore
import { Request, Response } from 'express';

export default {
  'PUT /monster/new/:id': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
