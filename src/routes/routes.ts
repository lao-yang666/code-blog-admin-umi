export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
    wrappers: [
      '@/wrappers/auth',
    ],
  },
  {
    name: '登录页',
    path: '/login',
    component: './Login',
    layout: false,
  },
  // {
  //   name: '权限演示2',
  //   path: '/access',
  //   component: './Access',
  // },
  {
    name: '文章管理',
    path: '/Post',
    exact: true,
    redirct: '/Post/PostList',
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
        exact: true,
        // menuRender: false,
      },
      {
        name: '文章详情',
        path: '/Post/PostDetail',
        component: './Post/postDetail',
        hideInMenu: true,
        exact: true,
        // menuRender: false,
      },
    ]
  },
  {
    name: '系统管理',
    path: '/System',
    exact: true,
    redirct: '/System/User',
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
        component: './Role',
        wrappers: [
          '@/wrappers/auth',
        ],
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


export const staticRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '登录页',
    path: '/login',
    component: './Login',
    layout: false,
  }
]