// @ts-ignore
import { Request, Response } from 'express';

export default {
  'PUT /api/rule': (req: Request, res: Response) => {
    res.status(200).send({
      key: 87,
      disabled: true,
      href: 'https://umijs.org/',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      name: '周桂英',
      owner: 'Perez',
      desc: '何期元这别圆铁律农次经广它度料划。',
      callNo: 94,
      status: 66,
      updatedAt: 'VRJg',
      createdAt: 'B8q',
      progress: 78,
    });
  },
};
