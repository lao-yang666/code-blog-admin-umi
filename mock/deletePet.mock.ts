// @ts-ignore
import { Request, Response } from 'express';

export default {
  'DELETE /pet/:petId': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
