// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    res.status(200).send({
      name: '朱磊',
      avatar: 'https://avatars0.githubusercontent.com/u/507615?s=40&v=4',
      userid: 'CF475Ab2-03f9-F8fB-8136-FBad88abcb66',
      email: 'n.yvvzty@runskcugfn.cl',
      signature: '严机务心的务际据产常学力往。',
      title: '水历感权情清思具空效便已切样号。',
      group: '',
      tags: [
        { key: 1, label: '专注设计' },
        { key: 2, label: '小清新' },
        { key: 3, label: '专注设计' },
        { key: 4, label: '海纳百川' },
        { key: 5, label: '阳光少年' },
        { key: 6, label: '健身达人' },
        { key: 7, label: '大长腿' },
        { key: 8, label: '算法工程师' },
        { key: 9, label: '' },
        { key: 10, label: '' },
        { key: 11, label: '健身达人' },
        { key: 12, label: '健身达人' },
        { key: 13, label: '程序员' },
        { key: 14, label: '大咖' },
        { key: 15, label: 'IT 互联网' },
        { key: 16, label: '健身达人' },
      ],
      notifyCount: 86,
      unreadCount: 61,
      country: '俄罗斯',
      access: '院么整约千问存即里养因话划马术速。',
      geographic: { province: { label: '山东省', key: 17 }, city: { label: '贺州市', key: 18 } },
      address: '河北省 沧州市 青县',
      phone: '11256843998',
    });
  },
};
