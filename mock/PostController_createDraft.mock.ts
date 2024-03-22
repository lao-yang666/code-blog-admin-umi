// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /post/draft/new': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
