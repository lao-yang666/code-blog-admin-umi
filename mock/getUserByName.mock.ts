// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /user/:username': (req: Request, res: Response) => {
    res.status(200).send({
      id: 66,
      username: 'Brown',
      firstName: 'Martinez',
      lastName: 'Rodriguez',
      email: 'b.ossmdrwy@wdekf.cq',
      password: 'zou@HI(adfp)60Ml',
      phone: '11266625979',
      userStatus: 68,
    });
  },
};
