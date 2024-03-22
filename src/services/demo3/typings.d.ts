declare namespace API {
  type Buffer = {};

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
    draftId?: string;
    Draft: Draft[];
    author?: User;
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

  type User = {
    id: number;
    email: string;
    name?: string;
    gender?: string;
    nickName?: string;
    Draft: Draft[];
    posts: Post[];
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
    gender: string;
  };

  type xmwAlready = {
    id: string;
    announcement_id: string;
    user_id: string;
    created_time: string;
    updated_time: string;
    xmw_announcement: xmwAnnouncement;
  };

  type xmwAnnouncement = {
    announcement_id: string;
    user_id: string;
    title: string;
    content: string;
    type: xmwAnnouncementType;
    status: number;
    pinned: number;
    created_time: string;
    updated_time: string;
    xmw_already: xmwAlready[];
    xmw_user: xmwUser;
  };

  type xmwAnnouncementType = 't1' | 't2' | 't3' | 't4';

  type xmwInternational = {
    id: string;
    name: string;
    parent_id?: string;
    zh_CN?: string;
    en_US?: string;
    ja_JP?: string;
    zh_TW?: string;
    founder: string;
    sort: number;
    created_time: string;
    updated_time: string;
  };

  type xmwJobs = {
    jobs_id: string;
    jobs_name: string;
    org_id: string;
    parent_id?: string;
    describe: string;
    sort: number;
    leader: string;
    founder: string;
    created_time: string;
    updated_time: string;
    xmw_organization: xmwOrganization;
  };

  type xmwLogs = {
    log_id: string;
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
    xmw_user: xmwUser;
  };

  type xmwMenu = {
    menu_id: string;
    name: string;
    menu_type: xmwMenuMenuType;
    path?: string;
    icon?: string;
    component?: string;
    redirect?: string;
    parent_id?: string;
    target?: xmwMenuTarget;
    permission?: string;
    layout?: xmwMenuLayout;
    navTheme?: xmwMenuNavTheme;
    headerTheme?: xmwMenuHeaderTheme;
    hideChildrenInMenu?: number;
    hideInMenu?: number;
    hideInBreadcrumb?: number;
    headerRender?: number;
    footerRender?: number;
    menuRender?: number;
    menuHeaderRender?: number;
    flatMenu?: number;
    fixedHeader?: number;
    fixSiderbar?: number;
    founder: string;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
  };

  type xmwMenuHeaderTheme = 'dark' | 'light';

  type xmwMenuLayout = 'side' | 'top' | 'mix';

  type xmwMenuMenuType = 'dir' | 'menu' | 'button';

  type xmwMenuNavTheme = 'dark' | 'light';

  type xmwMenuTarget = 'blank' | 'self' | 'parent' | 'top';

  type xmwOrganization = {
    org_id: string;
    org_name: string;
    parent_id?: string;
    org_code: string;
    org_type: xmwOrganizationOrgType;
    org_logo?: string;
    leader: string;
    founder: string;
    status: number;
    sort: number;
    describe: string;
    created_time: string;
    updated_time: string;
    xmw_jobs: xmwJobs[];
  };

  type xmwOrganizationOrgType = 'group' | 'company' | 'unit' | 'department';

  type xmwPermission = {
    permission_id: string;
    role_id?: string;
    menu_id?: string;
    created_time: string;
    updated_time: string;
    xmw_role?: xmwRole;
  };

  type xmwRole = {
    role_id: string;
    role_name: string;
    role_code: string;
    describe: string;
    founder: string;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
    xmw_permission: xmwPermission[];
    xmw_user: xmwUser[];
  };

  type xmwUser = {
    user_id: string;
    user_name: string;
    work_no: string;
    password: string;
    cn_name: string;
    en_name?: string;
    age: number;
    email?: string;
    phone: string;
    avatar_url?: string;
    sex: xmwUserSex;
    sort: number;
    status: number;
    token?: Buffer;
    motto?: string;
    tags?: string;
    city?: string;
    address?: string;
    jobs_id: string;
    org_id: string;
    role_id: string;
    founder: string;
    login_num: number;
    login_last_ip?: string;
    login_last_time?: string;
    created_time: string;
    updated_time: string;
    xmw_announcement: xmwAnnouncement[];
    xmw_logs: xmwLogs[];
    xmw_user: xmwUser;
    other_xmw_user: xmwUser[];
    xmw_role: xmwRole;
  };

  type xmwUserSex = 'woman' | 'man' | 'unknow';
}
