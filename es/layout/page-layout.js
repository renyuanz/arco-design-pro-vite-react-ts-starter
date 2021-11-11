var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import useLocale from "../utils/useLocale";
import getUrlParams from "../utils/getUrlParams";
import lazyload from "../utils/lazyload";
import styles from "./style/layout.module.less";
var MenuItem = Menu.Item;
var SubMenu = Menu.SubMenu;
var Sider = Layout.Sider;
var Content = Layout.Content;
function getFlattenRoutes() {
    var res = [];
    function travel(_routes) {
        _routes.forEach(function (route) {
            if (route.componentPath) {
                route.component = lazyload(function () { return import("../pages/" + route.componentPath); });
                res.push(route);
            }
            else if (isArray(route.children) && route.children.length) {
                travel(route.children);
            }
        });
    }
    travel(routes);
    return res;
}
function renderRoutes(locale) {
    var nodes = [];
    function travel(_routes, level) {
        return _routes.map(function (route) {
            var titleDom = (React.createElement(React.Fragment, null,
                route.icon,
                " ",
                (locale === null || locale === void 0 ? void 0 : locale[route.name]) || route.name));
            if (route.component &&
                (!isArray(route.children) ||
                    (isArray(route.children) && !route.children.length))) {
                if (level > 1) {
                    return React.createElement(MenuItem, { key: route.key }, titleDom);
                }
                nodes.push(React.createElement(MenuItem, { key: route.key },
                    React.createElement(Link, { to: "/" + route.key }, titleDom)));
            }
            if (isArray(route.children) && route.children.length) {
                if (level > 1) {
                    return (React.createElement(SubMenu, { key: route.key, title: titleDom }, travel(route.children, level + 1)));
                }
                nodes.push(React.createElement(SubMenu, { key: route.key, title: titleDom }, travel(route.children, level + 1)));
            }
        });
    }
    travel(routes, 1);
    return nodes;
}
function PageLayout() {
    var urlParams = getUrlParams();
    var pathname = history.location.pathname;
    var currentComponent = qs.parseUrl(pathname).url.slice(1);
    var defaultSelectedKeys = [currentComponent || defaultRoute];
    var locale = useLocale();
    var settings = useSelector(function (state) { return state.global.settings; });
    var _a = useState(false), collapsed = _a[0], setCollapsed = _a[1];
    var _b = useState(defaultSelectedKeys), selectedKeys = _b[0], setSelectedKeys = _b[1];
    var loadingBarRef = useRef(null);
    var navbarHeight = 60;
    var menuWidth = collapsed ? 48 : settings.menuWidth;
    var showNavbar = settings.navbar && urlParams.navbar !== false;
    var showMenu = settings.menu && urlParams.menu !== false;
    var showFooter = settings.footer && urlParams.footer !== false;
    var flattenRoutes = useMemo(function () { return getFlattenRoutes() || []; }, []);
    function onClickMenuItem(key) {
        var currentRoute = flattenRoutes.find(function (r) { return r.key === key; });
        var component = currentRoute.component;
        var preload = component.preload();
        loadingBarRef.current.loading();
        preload.then(function () {
            setSelectedKeys([key]);
            history.push(currentRoute.path ? currentRoute.path : "/" + key);
            loadingBarRef.current.success();
        });
    }
    function toggleCollapse() {
        setCollapsed(function (collapsed) { return !collapsed; });
    }
    var paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
    var paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
    var paddingStyle = __assign(__assign({}, paddingLeft), paddingTop);
    return (React.createElement(Layout, { className: styles.layout },
        React.createElement(LoadingBar, { ref: loadingBarRef }),
        showNavbar && (React.createElement("div", { className: styles.layoutNavbar },
            React.createElement(Navbar, null))),
        React.createElement(Layout, null,
            showMenu && (React.createElement(Sider, { className: styles.layoutSider, width: menuWidth, collapsed: collapsed, onCollapse: setCollapsed, trigger: null, collapsible: true, breakpoint: "xl", style: paddingTop },
                React.createElement("div", { className: styles.menuWrapper },
                    React.createElement(Menu, { collapse: collapsed, onClickMenuItem: onClickMenuItem, selectedKeys: selectedKeys, autoOpen: true }, renderRoutes(locale))),
                React.createElement("div", { className: styles.collapseBtn, onClick: toggleCollapse }, collapsed ? React.createElement(IconMenuUnfold, null) : React.createElement(IconMenuFold, null)))),
            React.createElement(Layout, { className: styles.layoutContent, style: paddingStyle },
                React.createElement(Content, null,
                    React.createElement(Switch, null,
                        flattenRoutes.map(function (route, index) {
                            return (React.createElement(Route, { key: index, path: "/" + route.key, component: route.component }));
                        }),
                        React.createElement(Redirect, { push: true, to: "/" + defaultRoute }))),
                showFooter && React.createElement(Footer, null)))));
}
export default PageLayout;
