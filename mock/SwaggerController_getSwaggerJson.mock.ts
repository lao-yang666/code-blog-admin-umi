// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /swagger-json': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
