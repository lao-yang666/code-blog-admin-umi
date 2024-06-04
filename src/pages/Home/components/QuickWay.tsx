import { Link } from '@umijs/max';
import { PropsWithChildren } from 'react';
import CardBoxWrap from '@/components/CardBoxWrap';
import { PlusOutlined } from '@ant-design/icons';
  interface NavItem {
    id: number,
    name: string,
    path: string,
    icon: string,
  }

  interface QuickWayProps {
    navList?: NavItem[]
  }

const defaultNavList: NavItem[] = [
  {
    id: 1,
    name: '创建问卷',
    path: '/questionnaire',
    icon: 'icon_box1',
  },
  {
    id: 2,
    name: '创建考试',
    path: '/exam',
    icon: 'icon_box2',
  },
  {
    id: 3,
    name: '创建投票',
    path: '/vote',
    icon: 'icon_box3',
  }
]
const QuickWay: React.FC<PropsWithChildren<QuickWayProps>> = (props) => {
  const { navList = defaultNavList } = props;
  return (<div className="enter_box">
    {navList.map((item) => {
      return (
        <Link
          key={item.id}
          to={item.path}
          className="a_box"
        >
          <div className="btn_box_enter">
            <PlusOutlined />
            <span>{item.name}</span>
          </div>
        </Link>
      )
    })
    }
  </div >)
}

const QuickWayCard = CardBoxWrap<QuickWayProps>(QuickWay);

export default QuickWayCard
