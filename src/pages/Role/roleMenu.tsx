import { PageContainer } from '@ant-design/pro-components'
import MenuTable from './components/MenuTable'
import MenuTree from './components/MenuTree'
import { Button, Col, Row, message } from 'antd'
import { useEffect, useState } from 'react';
import { useSearchParams } from '@umijs/max';
import services from '@/services/api';
const { menuControllerGetSelMenuList: queryMenuList,
  menuControllerUppdateRoleMenuPermission: modifyRoleMenuPermission,
  menuControllerGetSelPermissionList: roleGetMenuAccessByid,
  menuControllerGetMenuAccessByid: menuGetAccessByid } = services.caidanguanli;
const {
  buttonPermissionControllerUpdatebuttonPermissionStatus: modifybuttonPermissionStatus,
} = services.anniuquanxianguanli;

const {
  permissionControllerGetRoleUserAccessByid: getMenuView,
  permissionControllerUpdatepermission: modifyMenuView
} = services.quanxianguanli;

const TableList: React.FC<unknown> = () => {
  const [menuList, setMenuList] = useState<API.Menu[]>([]);
  const [checkMenu, setCheckMenu] = useState<React.Key[]>([]);
  const [selectedMenuKey, setSelectedMenuKey] = useState<React.Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [menuPermission, setMenuPermission] = useState<API.buttonPermission[]>([]);
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get('id'))

  const getMenuAllPermissionList = (menuId: number) => {
    menuGetAccessByid({ id: menuId as number }).then((res: any) => {
      if (res.code === 200) {
        setMenuPermission(res.data?.button_permission)
      }
    })
  }

  const getMenuPermissionList = () => {
    const params = {
      roleId: id,
      menuId: selectedMenuKey?.[0] as number
    }
    if (params.menuId) getMenuAllPermissionList(params.menuId);
    roleGetMenuAccessByid(params).then((res: any) => {
      if (res.code === 200) {
        console.log(res.data, '');
        const permissionId = res.data?.map((item: any) => item.permissionId)
        setSelectedRowKeys(permissionId)
      }
    })
  }



  const queryMenuView = async () => {
    getMenuView({ id }).then((res: any) => {
      if (res.code === 200) {
        const menuData = res.data;
        const menuIds = menuData.map((item: API.Menu) => item.menu_id)
        setCheckMenu(menuIds)
      }
    });
  }

  /** 
 * 菜单是否可见
 */

  const saveMenuView = async () => {
    const hide = message.loading('正在保存');
    const params = {
      role_id: id,
      menu_id: checkMenu as number[],
    }
    try {
      const res = await modifyMenuView(params);
      hide();

      message.success('保存成功');
      if (res) {
        console.log(res, '==');
        queryMenuView();

      }
      return true;
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  }

  const savePermission = async () => {
    const hide = message.loading('正在保存');
    const params = {
      roleId: id,
      menuId: selectedMenuKey?.[0] as number,
      permissionId: selectedRowKeys as number[]
    }
    try {
      await modifyRoleMenuPermission(params);
      hide();

      message.success('保存成功');
      await getMenuPermissionList()
      return true;
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  }

  const handleSwitch = async (id: number, status: number) => {
    const hide = message.loading('正在修改');
    try {
      await modifybuttonPermissionStatus(
        id, status
      );
      hide();

      message.success('修改成功');
      getMenuPermissionList()
      return true;
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  };

  useEffect(() => {
    getMenuPermissionList()
    queryMenuView();
    queryMenuList().then((res: any) => {
      if (res.code === 200) {
        setMenuList(res.data)
      }
    })
  }, [])


  useEffect(() => {
    getMenuPermissionList()
  }, [selectedMenuKey])

  return <PageContainer
    extra={[
      <Button key="2" type="primary" onClick={saveMenuView} disabled={checkMenu.length === 0}>保存菜单设置</Button>,
      <Button key="3" type="primary" onClick={savePermission} disabled={selectedRowKeys.length === 0}>保存权限设置</Button>,
    ]}
  >
    <Row>
      <Col span={5}>
        <MenuTree
          menuData={menuList}
          checkData={checkMenu}
          onNodeSelect={(val: React.Key[]) => { setSelectedMenuKey(val); }}
          onChange={(val: React.Key[]) => { setCheckMenu(val) }} />
      </Col>
      <Col span={19}>
        <MenuTable
          tableData={menuPermission}
          handleSwitch={handleSwitch}
          setSelectedRowKeys={(val) => { setSelectedRowKeys(val) }}
          selectedRowKeys={selectedRowKeys} />
      </Col>
    </Row>
  </PageContainer>
}

export default TableList