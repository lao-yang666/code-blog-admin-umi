declare namespace API {

  type gameShanhaiMonster = {
    id: number;
    name?: string;
    age?: string;
    location?: string;
    element?: string;
    needSeals?: string;
    parts: gameShanhaiMonsterParts[];
  };

  type gameShanhaiMonsterParts = {
    id: number;
    name: string;
    attack: number;
    monsterId?: number;
    monster?: gameShanhaiMonster;
  };

  type MonsterControllerDeleteMonsterParams = {
    id: string;
  };

  type MonsterControllerGetMonsterByIdParams = {
    id: string;
  };

  type MonsterControllerGetMonstersParams = {
    current: string;
    pageSize: string;
  };

  type MonsterControllerPublishMonsterParams = {
    id: string;
  };

  type Post = {
    id: number;
    draftId?: number;
    postId?: number;
    title: string;
    content: string;
    published?: boolean;
    authorId?: number;
    authorName?: string;
    category?: string;
    viewNum?: number;
    ikeNum?: number;
    commentNum?: number;
    commentList?: string;
    publish_time?: string;
    update_time?: string;
  };

  type PostNew = {
    draftId?: number;
    postId?: number;
    title: string;
    content: string;
    published?: boolean;
    authorId: number;
    authorName: string;
    category?: string;
    viewNum?: number;
    ikeNum?: number;
    commentNum?: number;
    commentList?: string;
    publish_time?: string;
    update_time?: string;
  };

  type PostControllerDeleteDraftParams = {
    id: string;
  };

  type PostControllerDeletePostParams = {
    id: string;
  };

  type PostControllerGetPostByIdParams = {
    id: string;
  };

  type PostControllerGetPublishedPostsParams = {
    current: string;
    pageSize: string;
  };

  type PostControllerUpdateDraftParams = {
    id: string;
  };

  type PostControllerUpdatePostParams = {
    id: string;
  };

  type Role = {
    id: number;
    role_name: string;
    role_code: string;
    describe: string;
    founder: string;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
    Permission?: Permission[];
    user?: User[];
  };

  type RoleControllerDeleteRoleParams = {
    id: number;
  };

  type RoleControllerGetRoleByidParams = {
    id: number;
  };

  type RoleControllerGetRolesParams = {
    current: string;
    pageSize: string;
  };

  type RoleNew = {
    role_name: string;
    role_code: string;
    describe: string;
    founder: string;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
  };

  type Permission = {
    role_id?: string;
    menu_id?: string;
    created_time: string;
    updated_time: string;
    Role?: Role;
    Menu?: Menu;
  };

  type PermissionControllerGetRoleUserAccessByidParams = {
    id: number;
  };

  type PermissionNew = {
    role_id: number;
    menu_id: string[];
  };

  type Permissions = {
    id: number;
    name: string;
    permission_key: string;
    role_id?: number;
    menu_id?: number;
    button_id?: number;
    scope: permissionScope;
    describe?: string;
    created_time: string;
    updated_time: string;
  };

  type PermissionsControllerDeletePermissionsParams = {
    id: number;
  };

  type PermissionsControllerGetPermissionsByidParams = {
    id: string;
  };

  type PermissionsControllerGetPermissionssParams = {
    current: string;
    pageSize: string;
    name: string;
    permissions_name?: any;
  };

  type permissionScope = 'role' | 'menu' | 'button';

  type PermissionsNew = {
    name: string;
    permission_key: string;
    role_id?: number;
    menu_id?: number;
    button_id?: number;
    scope: permissionScope;
    describe?: string;
    created_time: string;
    updated_time: string;
  };

  type User = {
    id: number;
    email: string;
    phone: string;
    password: string;
    role_id: string;
    role_name?: string;
    name?: string;
    gender: userSex;
    nickName?: string;
  };

  type UserControllerDeleteDraftParams = {
    id: string;
  };

  type UserControllerGetUserByIdParams = {
    id: string;
  };

  type UserControllerGetUserListParams = {
    current: string;
    pageSize: string;
    name: string;
    nickName: string;
    gender: 'woman' | 'man';
  };

  type UserNew = {
    email: string;
    phone: string;
    password: string;
    role_id: string;
    role_name?: string;
    name?: string;
    gender: userSex;
    nickName?: string;
  };

  type Logs = {
    id: number;
    user_id: string;
    content: string;
    ip: string;
    path: string;
    user_agent: string;
    params: string;
    method: string;
    api_url: string;
    created_time: string;
    updated_time: string;
  };

  type userSex = 'woman' | 'man';

  type LogsNew = {
    user_id: string;
    content: string;
    ip: string;
    path: string;
    user_agent: string;
    params: string;
    method: string;
    api_url: string;
    created_time: string;
    updated_time: string;
  };

  type LogsControllerGetRolesParams = {
    current: string;
    pageSize: string;
  };

  type PaginationParams = {
    current: number;
    pageSize: number;
  }

  type Menu = {
    menu_id: number;
    name: string;
    path: string;
    icon?: string;
    component?: string;
    redirect?: string;
    parent_id?: number;
    permission?: string;
    meta?: string;
    extraProperties?: string;
    wrappers?: number;
    hideChildrenInMenu?: number;
    hideInMenu?: number;
    hideInBreadcrumb?: number;
    founder: number;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
    children?: Menu[];
  };

  type MenuNew = {
    name: string;
    path: string;
    icon?: string;
    component?: string;
    redirect?: string;
    parent_id?: number;
    permission?: string;
    meta?: string;
    extraProperties?: string;
    wrappers?: number;
    hideChildrenInMenu?: number;
    hideInMenu?: number;
    hideInBreadcrumb?: number;
    founder: number;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
    children?: Menu[];
  };
  type buttonPermission = {
    id: number;
    name: string;
    permission_key: string;
    menu_id: number;
    effect_form?: string;
    describe?: string;
    created_time: string;
    updated_time: string;
    menu: API.Menu;
  };

  type ButtonPermissionControllerDeletebuttonPermissionParams = {
    id: number;
  };

  type ButtonPermissionControllerGetbuttonPermissionByidParams = {
    id: string;
  };

  type ButtonPermissionControllerGetbuttonPermissionsParams = {
    current: string;
    pageSize: string;
    name: string;
    button_permission_name?: any;
  };

  type ButtonPermissionControllerGetbuttonPermissionUserAccessByidParams = {
    id: string;
  };

  type buttonPermissionNew = {
    name: string;
    permission_key: string;
    menu_id: number;
    effect_form?: string;
    describe?: string;
    created_time: string;
    updated_time: string;
  };
}