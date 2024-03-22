// @ts-ignore
import { Request, Response } from 'express';

export default {
  'DELETE /user/:username': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
