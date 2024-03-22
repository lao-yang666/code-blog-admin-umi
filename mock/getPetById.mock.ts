// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /pet/:petId': (req: Request, res: Response) => {
    res.status(200).send({
      id: 81,
      category: { id: 87, name: '黎秀兰' },
      name: 'doggie',
      photoUrls: [
        'https://ant.design',
        'https://ant.design',
        'https://procomponents.ant.design/',
        'https://github.com/umijs/dumi',
        'https://umijs.org/',
        'https://procomponents.ant.design/',
        'https://umijs.org/',
      ],
      tags: [
        { id: 95, name: '赖强' },
        { id: 95, name: '锺超' },
        { id: 83, name: '魏娟' },
        { id: 70, name: '钱霞' },
        { id: 86, name: '邓娟' },
        { id: 92, name: '余芳' },
        { id: 73, name: '韩霞' },
        { id: 76, name: '宋勇' },
        { id: 67, name: '薛丽' },
        { id: 98, name: '毛秀英' },
        { id: 93, name: '陆强' },
        { id: 60, name: '阎磊' },
        { id: 85, name: '李秀英' },
        { id: 62, name: '曾明' },
        { id: 94, name: '许强' },
        { id: 71, name: '薛涛' },
        { id: 74, name: '叶霞' },
        { id: 86, name: '于磊' },
        { id: 86, name: '毛娜' },
      ],
      status: 'available',
    });
  },
};
