import { formatRoute } from "@/utils/route";
import { DynamicRoutes } from "@/utils/types/dynamicroutes/typings";
import { Navigate } from "@umijs/max";
import React from "react";

const loopMenuItem = (menus: API.Menu[], pId: number | string | undefined): DynamicRoutes.RouteItem[] => {
  return menus.flatMap((item): any => {
    let Component: React.ComponentType<any> | null = null;
    if (item.component) {
      // 防止配置了路由，但本地暂未添加对应的页面，产生的错误
      Component = React.lazy(() => new Promise((resolve) => {
        import(`@/pages${item.component}`)
          .then(module => resolve(module))
          .catch(() => resolve(import(`@/pages/404.tsx`)))
      }))
    }
    if (item.children) {
      return [
        {
          parentId: pId,
          ...formatRoute(item),
          children: [
            {
              path: item.path,
              element: <Navigate to={item?.redirect ?? item.children[0].path} replace />,
            },
            ...loopMenuItem(item.children, item.menu_id)
          ]
        }
      ]
    } else {
      return [
        {
          ...formatRoute(item),
          parentId: pId,
          element: (
            <React.Suspense fallback={<div>Loading...</div>}>
              {/* {React.createElement(React.lazy(() => import(`@/pages${item.component}`)))} */}
              {Component && <Component />}
            </React.Suspense>

          )
        }
      ]
    }
  })
}

export default loopMenuItem;