// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
