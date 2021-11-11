import React from "react";
import { Tooltip, Button, Avatar, Select, Typography, Dropdown, Menu, Space, } from "@arco-design/web-react";
import { IconSunFill, IconMoonFill } from "@arco-design/web-react/icon";
import { useSelector, useDispatch } from "react-redux";
import useLocale from "../../utils/useLocale";
// import Logo from "../../assets/logo.svg";
import history from "../../history";
import MessageBox from "../MessageBox";
import styles from "./style/index.module.less";
function Navbar() {
    var locale = useLocale();
    var theme = useSelector(function (state) { return state.global.theme; });
    var userInfo = useSelector(function (state) { return state.global.userInfo; });
    var dispatch = useDispatch();
    function logout() {
        localStorage.setItem("userStatus", "logout");
        history.push("/user/login");
    }
    function onMenuItemClick(key) {
        if (key === "logout") {
            logout();
        }
    }
    return (React.createElement("div", { className: styles.navbar },
        React.createElement("div", { className: styles.left },
            React.createElement(Space, { size: 8 },
                React.createElement(Typography.Title, { style: { margin: 0, fontSize: 18 }, heading: 5 }, "Arco Design Pro"))),
        React.createElement("ul", { className: styles.right },
            React.createElement("li", null,
                React.createElement(MessageBox, null)),
            React.createElement("li", null,
                React.createElement("a", null, locale === null || locale === void 0 ? void 0 : locale["navbar.docs"])),
            React.createElement("li", null,
                React.createElement(Select, { options: [
                        { label: "中文", value: "zh-CN" },
                        { label: "English", value: "en-US" },
                    ], value: localStorage.getItem("arco-lang"), bordered: false, triggerProps: {
                        autoAlignPopupWidth: false,
                        autoAlignPopupMinWidth: true,
                        position: "bl",
                    }, onChange: function (value) {
                        localStorage.setItem("arco-lang", value);
                        window.location.reload();
                    } })),
            React.createElement("li", null,
                React.createElement(Tooltip, { content: theme === "light"
                        ? locale === null || locale === void 0 ? void 0 : locale["settings.navbar.theme.toDark"]
                        : locale === null || locale === void 0 ? void 0 : locale["settings.navbar.theme.toLight"] },
                    React.createElement(Button, { type: "text", icon: theme === "light" ? React.createElement(IconMoonFill, null) : React.createElement(IconSunFill, null), onClick: function () {
                            return dispatch({
                                type: "toggle-theme",
                                payload: { theme: theme === "light" ? "dark" : "light" },
                            });
                        }, style: { fontSize: 20 } }))),
            userInfo && (React.createElement("li", null,
                React.createElement(Avatar, { size: 24, style: { marginRight: 8 } },
                    React.createElement("img", { alt: "avatar", src: userInfo.avatar })),
                React.createElement(Dropdown, { trigger: "click", droplist: React.createElement(Menu, { onClickMenuItem: onMenuItemClick },
                        React.createElement(Menu.Item, { key: "logout" }, "\u767B\u51FA")) },
                    React.createElement(Typography.Text, { className: styles.username }, userInfo.name)))))));
}
export default Navbar;
