import { ComponentType, ReactElement } from 'react';
import './index.less';
interface WrappedComponentProps {
  title: string,
  height?: string,
}

type WrappedComponent<T> = ComponentType<T>;

const CardBoxWrap = <T extends object>(WrappedComponent: WrappedComponent<T>) => {
  return (props: WrappedComponentProps & T): ReactElement => {
    const { title, height = '410px' } = props;
    return (
      <div className="card_box" style={{ height }}>
        <div>
          <i className="card_bord"></i><span className="top_title">{title}</span>
        </div>
        <div className="divider"></div>
        <WrappedComponent {...props} />
      </div>
    )
  }
};

export default CardBoxWrap;
