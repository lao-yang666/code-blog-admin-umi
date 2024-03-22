// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/rule': (req: Request, res: Response) => {
    res.status(200).send({
      data: [
        {
          key: 86,
          disabled: true,
          href: 'https://preview.pro.ant.design/dashboard/analysis',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          name: '李军',
          owner: 'Jackson',
          desc: '加平派年选去法员水识资信很。',
          callNo: 84,
          status: 80,
          updatedAt: 'R$wqv',
          createdAt: 'TMY1',
          progress: 97,
        },
        {
          key: 94,
          disabled: false,
          href: 'https://procomponents.ant.design/',
          avatar: 'https://avatars0.githubusercontent.com/u/507615?s=40&v=4',
          name: '任静',
          owner: 'Lee',
          desc: '几问革们并听家类性土提争八。',
          callNo: 60,
          status: 88,
          updatedAt: 'WUGA',
          createdAt: '1mj2*',
          progress: 79,
        },
        {
          key: 70,
          disabled: false,
          href: 'https://github.com/umijs/dumi',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
          name: '卢超',
          owner: 'Williams',
          desc: '一生战历两二组算分术例实比。',
          callNo: 69,
          status: 89,
          updatedAt: '1W4',
          createdAt: '08e8#b',
          progress: 99,
        },
        {
          key: 84,
          disabled: false,
          href: 'https://github.com/umijs/dumi',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          name: '黄艳',
          owner: 'Smith',
          desc: '革相及属火海许大同面开压现采交老处。',
          callNo: 88,
          status: 72,
          updatedAt: 'Qy0',
          createdAt: 'pS3BI',
          progress: 73,
        },
      ],
      total: 69,
      success: false,
    });
  },
};
