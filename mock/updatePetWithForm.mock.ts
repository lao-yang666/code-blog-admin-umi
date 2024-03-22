// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pet/:petId': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
