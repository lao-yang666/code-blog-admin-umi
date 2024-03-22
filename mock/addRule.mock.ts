// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/rule': (req: Request, res: Response) => {
    res.status(200).send({
      key: 84,
      disabled: false,
      href: 'https://umijs.org/',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      name: '潘勇',
      owner: 'Williams',
      desc: '千想市眼会至级战林存儿器度术能。',
      callNo: 79,
      status: 83,
      updatedAt: '4kkjak',
      createdAt: 'DYN2W6',
      progress: 71,
    });
  },
};
