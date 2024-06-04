import React, { PropsWithChildren, useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

const { Search } = Input;

interface MenuTreeProps {
  menuData: TreeDataNode[];
  checkData: React.Key[];
  onChange: (val: React.Key[]) => void;
  onNodeSelect: (val: React.Key[]) => void;
}

const MenuTree: React.FC<PropsWithChildren<MenuTreeProps>> = (props) => {
  const { menuData, checkData, onChange, onNodeSelect } = props;
  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    onChange(checkedKeysValue?.checked as React.Key[]);
  };

  const onNodeClick: TreeProps['onSelect'] = (selectedKeys) => {
    console.log('onNodeClick', selectedKeys);
    if (selectedKeys.length) {
      onNodeSelect(selectedKeys as React.Key[]);
    }

  }
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onSearch', e.target.value);
  }
  return (
    <div style={{ width: '300px', marginRight: '20px' }}>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onSearch} />
      <Tree
        blockNode
        checkStrictly
        rootStyle={{ padding: '10px' }}
        style={{ height: 'calc(100vh - 200px)' }}
        checkable
        fieldNames={{ title: 'name', key: 'menu_id' }}
        defaultExpandAll={true}
        autoExpandParent={true}
        onCheck={onCheck}
        onSelect={onNodeClick}
        checkedKeys={checkData}
        treeData={menuData}
      />
    </div>
  );
};

export default MenuTree;