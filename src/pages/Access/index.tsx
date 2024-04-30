import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';
import { useState } from 'react';

// const AccessPage: React.FC = () => {
//   const access = useAccess();
//   return (
//     <PageContainer
//       ghost
//       header={{
//         title: '权限示例',
//       }}
//     >
//       <Access accessible={access.canSeeAdmin}>
//         <Button>只有 Admin 可以看到这个按钮</Button>
//       </Access>
//     </PageContainer>
//   );
// };

// export default AccessPage;
const Button2 = () => {

  const Button1 = () => {
    return <Button>222</Button>;
  };
  // ✅ Using component as <Button />, not Button
  return (
    <div>
      {Button1()}
    </div>
  );
};
export default Button2;