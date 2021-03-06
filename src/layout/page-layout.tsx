import React, { useState, useRef, useMemo } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Layout, Menu } from "@arco-design/web-react";
import { IconMenuFold, IconMenuUnfold } from "@arco-design/web-react/icon";
import { useSelector } from "react-redux";
import qs from "query-string";
import history from "../history";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import LoadingBar from "../components/LoadingBar";
import { routes, defaultRoute } from "../routes";
import { isArray } from "../utils/is";
import { ReducerState } from "../redux";
import getUrlParams from "../utils/getUrlParams";
import lazyload from "../utils/lazyload";
import styles from "./style/layout.module.less";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;

interface RouteType {
  name?: string;
  key: string;
  path?: string;
  icon?: React.ReactElement;
  componentPath?: string;
  component?: any;
  children?: RouteType[];
}

function getFlattenRoutes() {
  const res: RouteType[] = [];
  function travel(_routes: RouteType[]) {
    _routes.forEach((route) => {
      if (route.componentPath) {
        route.component = lazyload(
          () => import(`../pages/${route.componentPath}/index.tsx`)
        );
        res.push(route);
      } else if (
        route.children &&
        isArray(route.children) &&
        route.children.length
      ) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}

function renderRoutes() {
  const nodes: React.ReactElement[] = [];
  function travel(_routes: RouteType[], level: number) {
    return _routes.map((route) => {
      const titleDom = (
        <>
          {route.icon} {route.name}
        </>
      );
      if (
        route.component &&
        (!isArray(route.children) ||
          (isArray(route.children) && !route?.children?.length))
      ) {
        if (level > 1) {
          return <MenuItem key={route.key}>{titleDom}</MenuItem>;
        }
        nodes.push(
          <MenuItem key={route.key}>
            <Link to={`/${route.key}`}>{titleDom}</Link>
          </MenuItem>
        );
      }
      if (isArray(route.children) && route?.children?.length) {
        if (level > 1) {
          return (
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1)}
            </SubMenu>
          );
        }
        nodes.push(
          <SubMenu key={route.key} title={titleDom}>
            {travel(route.children, level + 1)}
          </SubMenu>
        );
      }
    });
  }
  travel(routes, 1);
  return nodes;
}

interface RefObject {
  loading: () => void;
  success: () => void;
}

function PageLayout() {
  const urlParams = getUrlParams();
  const pathname = history.location.pathname;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const settings = useSelector((state: ReducerState) => state.global.settings);

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const loadingBarRef = useRef<RefObject>(null);

  const navbarHeight = 60;
  const menuWidth = collapsed ? 48 : settings.menuWidth;

  const showNavbar = settings.navbar && urlParams.navbar !== false;
  const showMenu = settings.menu && urlParams.menu !== false;
  const showFooter = settings.footer && urlParams.footer !== false;

  const flattenRoutes = useMemo(() => getFlattenRoutes() || [], []);

  function onClickMenuItem(key: string) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    if (!currentRoute) return;
    const component = currentRoute.component;
    const preload = component.preload();

    if (null !== loadingBarRef.current) {
      loadingBarRef.current.loading();
    }
    preload.then(() => {
      setSelectedKeys([key]);
      history.push(currentRoute.path ? currentRoute.path : `/${key}`);
      if (null !== loadingBarRef.current) {
        loadingBarRef.current.success();
      }
    });
  }

  function toggleCollapse() {
    setCollapsed((collapsed) => !collapsed);
  }

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  return (
    <Layout className={styles.layout}>
      <LoadingBar ref={loadingBarRef} />
      {showNavbar && (
        <div className={styles.layoutNavbar}>
          <Navbar />
        </div>
      )}
      <Layout>
        {showMenu && (
          <Sider
            className={styles.layoutSider}
            width={menuWidth}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            collapsible
            breakpoint="xl"
            style={paddingTop}
          >
            <div className={styles.menuWrapper}>
              <Menu
                collapse={collapsed}
                onClickMenuItem={onClickMenuItem}
                selectedKeys={selectedKeys}
                autoOpen
              >
                {renderRoutes()}
              </Menu>
            </div>
            <div className={styles.collapseBtn} onClick={toggleCollapse}>
              {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
            </div>
          </Sider>
        )}
        <Layout className={styles.layoutContent} style={paddingStyle}>
          <Content>
            <Switch>
              {flattenRoutes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={`/${route.key}`}
                    component={route.component}
                  />
                );
              })}
              <Redirect push to={`/${defaultRoute}`} />
            </Switch>
          </Content>
          {showFooter && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
