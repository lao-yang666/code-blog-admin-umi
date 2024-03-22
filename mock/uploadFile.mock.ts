// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pet/:petId/uploadImage': (req: Request, res: Response) => {
    res.status(200).send({ code: 73, type: 1, message: '做单据代手转特行该被况极据题面非。' });
  },
};
