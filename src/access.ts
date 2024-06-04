import type { InitialStateTypes } from '@/utils/types'
export default (initialState: InitialStateTypes) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  if (!initialState) return {}
  const {
    userInfo,
    MenuData,
    Permissions
  } = initialState;
  const menuAccess: Record<string, Array<{ effect_form: string; permission_key: string; }>> = {};
  Permissions?.forEach((item: API.RoleMenuPermission) => {
    if (!menuAccess[item.menuId]) {
      menuAccess[item.menuId] = []
    }
    menuAccess[item.menuId].push({
      effect_form: item.button_permission.effect_form,
      permission_key: item.button_permission.permission_key
    })
  })
  console.log(menuAccess, '=========menuAccess===========');

  // MenuData?.forEach((item: API.Menu) => {
  //    menuAccess[item.menu.path]
  // })
  return {
    role_level: userInfo?.role?.sort as number,
    menuAccess,
    canLook: true,
  };
};
