/*
 * @Description: 入口文件-全局 layout 配置
 * @Version: 2.0
 * @Author: 老羊
 * @Date: 2022-09-19 20:39:53
 * @LastEditors: 老羊
 * @LastEditTime: 2023-10-19 15:47:21
 */
import { ProConfigProvider, SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, Link, useKeepOutlets } from '@umijs/max';
import type { RuntimeConfig } from '@umijs/max';
import { useBoolean } from 'ahooks'
import { Space, Typography } from 'antd'
import { eq, toString } from 'lodash-es'
import { getMenuListByRoutes } from '@/utils/route';
import Footer from '@/components/Footer'; // 全局底部版权组件
import { IconFont } from '@/utils/format'
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import type { InitialStateTypes } from '@/utils/types'

import {
	ActionButtons,
	actionsRender,
	appList, avatarProps,
	LockScreenModal,
	LockSleep
} from './components'
import { getSessionStorageItem, isLogin, setSessionStorageItem } from '@/utils';

const { Paragraph } = Typography;

export const BasiLayout: RuntimeConfig = ({ initialState, setInitialState }: InitialStateTypes) => {
	const element = useKeepOutlets();
	/* 获取 LAYOUT 的值 */
	const LAYOUT = getSessionStorageItem<LayoutSettings>(LOCAL_STORAGE.LAYOUT)
	/* 是否显示锁屏弹窗 */
	const [openLockModal, { setTrue: setLockModalTrue, setFalse: setLockModalFalse }] = useBoolean(false)

	return {
		logo: '../../public/img/logo.png',
		/* 菜单图标使用iconfont */
		iconfontUrl: process.env.ICONFONT_URL,
		/* 水印 */
		waterMarkProps: {
			content: initialState?.userInfo?.nickName,
		},
		/* 用户头像 */
		avatarProps: avatarProps(setLockModalTrue),
		/* 自定义操作列表 */
		actionsRender,
		/* 底部版权 */
		footerRender: () => <Footer />,
		/* 页面切换时触发 */
		onPageChange: (location) => {
			// 如果没有登录，重定向到 login
			if (!isLogin() && !eq(location?.pathname, ROUTES.LOGIN)) {
				history.push(ROUTES.LOGIN);
			}
		},
		menu: {
			logo: '../../public/img/logo.png',
			locale: false,
			params: initialState?.CurrentRoleId,
			request: async () => {
				return getMenuListByRoutes(initialState?.MenuData ?? [], initialState?.menuViewIds)
			},
		},
		/* 自定义面包屑 */
		// breadcrumbProps: {
		// 	itemRender: (route) => {
		// 		return (
		// 			<Space>
		// 				<IconFont type={`icon-${last(route.linkPath.split('/'))}`} />
		// 				<span>{route.breadcrumbName}</span>
		// 			</Space>
		// 		)
		// 	},
		// },
		/* 自定义菜单项的 render 方法 */
		menuItemRender: (menuItemProps, defaultDom) => {
			const renderMenuDom = () => {
				return (
					<Space>
						{/* 分组布局不用渲染图标，避免重复 */}
						{!(LAYOUT?.siderMenuType === 'group') &&
							menuItemProps.pro_layout_parentKeys?.length &&
							<IconFont type={toString(menuItemProps.icon)} />}
						<Paragraph
							ellipsis={{ rows: 1, tooltip: defaultDom }}
							style={{ marginBottom: 0 }}>
							{defaultDom}
						</Paragraph>
					</Space>
				)
			}
			return (
				/* 渲染二级菜单图标 */
				menuItemProps.isUrl ?
					<a href={menuItemProps.path} target="_blank">
						{renderMenuDom()}
					</a> :
					<Link to={menuItemProps.path || '/'} >
						{renderMenuDom()}
					</Link>
			);
		},
		// 菜单的折叠收起事件
		onCollapse: (collapsed) => {
			setInitialState((s: InitialStateTypes) => ({ ...s, Collapsed: collapsed }));
		},
		// 跨站点导航列表
		appList,
		// childrenRender: (children) => {
		// 	return <>{element}<>
		// },
		//	增加一个 loading 的状态
		childrenRender: (children) => {
			return (
				<>
					<ProConfigProvider>
						{children}
						{/* 锁屏弹窗 */}
						<LockScreenModal open={openLockModal} setOpenFalse={setLockModalFalse} />
						{/* 睡眠弹窗 */}
						<LockSleep />
						{/* 全局通用按钮 */}
						<ActionButtons />
						{/* 工具栏 */}
						<SettingDrawer
							disableUrlParams
							enableDarkTheme
							settings={LAYOUT || {}}
							onSettingChange={(Settings: LayoutSettings) => {
								setSessionStorageItem(LOCAL_STORAGE.LAYOUT, { ...initialState?.Settings, ...Settings })
								setInitialState((s: InitialStateTypes) => ({ ...s, Settings }));
							}}
						/>
					</ProConfigProvider>
				</>
			);
		},
		...LAYOUT,
	};
}