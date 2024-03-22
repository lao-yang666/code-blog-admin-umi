// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /pet/findByTags': (req: Request, res: Response) => {
    res.status(200).send([
      {
        id: 94,
        category: { id: 81, name: '夏强' },
        name: 'doggie',
        photoUrls: [
          'https://ant.design',
          'https://ant.design',
          '',
          'https://ant.design',
          'https://umijs.org/',
          'https://github.com/umijs/dumi',
          'https://umijs.org/',
          'https://github.com/umijs/dumi',
        ],
        tags: [
          { id: 86, name: '何娟' },
          { id: 73, name: '王磊' },
        ],
        status: 'available',
      },
    ]);
  },
};
