export const staticRoutes = [
  {
    path: '/',
    redirect: '/System/User',
  },
  {
    path: '/404',
    redirect: '/404',
  },
  {
    path: '/403',
    redirect: '/403',
  },
  {
    name: '登录页',
    path: '/login',
    component: './Login',
    layout: false,
  }
]

export default [
  ...staticRoutes,
  {
    name: '首页',
    path: '/home',
    component: './Home',
    wrappers: [
      '@/wrappers/auth',
    ],
  },
  {
    name: '文章管理',
    path: '/Post',
    routes: [
      {
        name: '文章列表',
        path: '/Post/PostList',
        component: './Post',
      },
      {
        name: '新建文章',
        path: '/Post/PostAdd',
        component: './Post/postAdd',
        hideInMenu: true,
        // menuRender: false,
      },
      {
        name: '文章详情',
        path: '/Post/PostDetail',
        component: './Post/postDetail',
        hideInMenu: true,
        // menuRender: false,
      },
    ]
  },
  {
    name: '系统管理',
    path: '/System',
    exact: true,
    routes: [
      {
        name: '用户管理',
        path: '/System/User',
        component: './User',
        wrappers: [
          '@/wrappers/auth',
        ],
      },
      {
        name: '组织管理',
        path: '/System/Group',
        component: './Group',
        wrappers: [
          '@/wrappers/auth',
        ],
      },
      {
        name: '角色管理',
        path: '/System/Role',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/System/Role',
            redirect: '/System/Role/List',
          },
          {
            name: '角色列表',
            path: 'List',
            component: './Role',
          },
          {
            name: '分配角色菜单',
            path: 'RoleMenu',
            component: './Role/roleMenu',

          },
        ]
      },
      {
        name: '菜单管理',
        path: '/System/Menu',
        component: './Menu',
        wrappers: [
          '@/wrappers/auth',
        ],
      },
      {
        name: '权限管理',
        path: '/System/Permission',
        component: './Permission',
        wrappers: [
          '@/wrappers/auth',
        ],
      },
    ],
  },
]
