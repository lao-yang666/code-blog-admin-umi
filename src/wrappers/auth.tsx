import { Navigate, Outlet } from 'umi'
import { isLogin } from '@/utils';
import { useRouteProps } from '@umijs/max';
export default () => {
  if (isLogin()) {

    const routeProps = useRouteProps();
    console.log('=====================================路由鉴权', routeProps);
    if (routeProps.hasAccess) {
      return <Outlet />;
    } else {
      // 没有权限
      return <Navigate to="/403" />;
    }

  } else {
    return <Navigate to="/login" />;
  }
}