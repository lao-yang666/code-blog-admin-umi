// @ts-ignore
import { Request, Response } from 'express';

export default {
  'PUT /user/{id}': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
