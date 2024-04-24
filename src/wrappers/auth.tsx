import { Navigate, Outlet } from 'umi'
import { isLogin } from '@/utils';
export default () => {
  if (isLogin()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}