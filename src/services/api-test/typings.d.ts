declare namespace API {
  type buttonPermission = {
    id: number;
    name: string;
    permission_key: string;
    menu_id: number;
    effect_form?: string;
    describe?: string;
    created_time: string;
    updated_time: string;
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

  type Draft = {
    id: number;
    title: string;
    content?: string;
    published?: boolean;
    authorId?: number;
    pubTime?: string;
    category?: string;
    viewNum?: number;
    ikeNum?: number;
    commentNum?: number;
    commentList?: string;
    postId?: number;
    User?: User;
    Post?: Post;
  };

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

  type LogsControllerGetLogssParams = {
    current: string;
    pageSize: string;
  };

  type Menu = {
    menu_id: number;
    name: string;
    path: string;
    icon?: string;
    component?: string;
    redirect?: string;
    parent_id?: number;
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
  };

  type MenuControllerDeleteMenuParams = {
    id: number;
  };

  type MenuControllerGetMenuByidParams = {
    id: string;
  };

  type MenuControllerGetMenusParams = {
    current: string;
    pageSize: string;
    name: string;
    menu_name?: any;
  };

  type MenuControllerGetMenuUserAccessByidParams = {
    id: string;
  };

  type MenuNew = {
    name: string;
    path: string;
    icon?: string;
    component?: string;
    redirect?: string;
    parent_id?: number;
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
    created_time: string;
    updated_time: string;
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
    published?: string;
    title?: string;
    startTime?: string;
    endTime?: string;
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
    created_time: string;
    updated_time: string;
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
    role_name?: string;
    status: string;
  };

  type RoleControllerGetRoleUserAccessByidParams = {
    id: number;
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

  type User = {
    id: number;
    email: string;
    name?: string;
    password: string;
    role_id: string;
    phone: string;
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
    name?: string;
    nickName?: string;
    gender?: 'woman' | 'man';
    role_id: string;
  };

  type UserNew = {
    email: string;
    name?: string;
    password: string;
    role_id: string;
    phone: string;
    gender: userSex;
    nickName?: string;
  };

  type userSex = 'woman' | 'man';
}
