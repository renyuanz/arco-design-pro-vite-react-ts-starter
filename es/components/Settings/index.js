import React, { useState } from "react";
import { Drawer, Alert, Message } from "@arco-design/web-react";
import { IconSettings } from "@arco-design/web-react/icon";
import copy from "copy-to-clipboard";
import { useSelector } from "react-redux";
import Block from "./block";
import ColorPanel from "./color";
import useLocale from "../../utils/useLocale";
import styles from "./style/index.module.less";
function Setting() {
    var _a = useState(false), visible = _a[0], setVisible = _a[1];
    var locale = useLocale();
    var settings = useSelector(function (state) { return state.global.settings; });
    function onCopySettings() {
        copy(JSON.stringify(settings, null, 2));
        Message.success(locale === null || locale === void 0 ? void 0 : locale["settings.copySettings.message"]);
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: styles.btn, onClick: function () { return setVisible(true); } },
            React.createElement(IconSettings, null)),
        React.createElement(Drawer, { width: 300, title: React.createElement(React.Fragment, null,
                React.createElement(IconSettings, null), locale === null || locale === void 0 ? void 0 :
                locale["settings.title"]), visible: visible, okText: locale === null || locale === void 0 ? void 0 : locale["settings.copySettings"], cancelText: locale === null || locale === void 0 ? void 0 : locale["settings.close"], onOk: onCopySettings, onCancel: function () { return setVisible(false); } },
            React.createElement(Block, { title: locale === null || locale === void 0 ? void 0 : locale["settings.themeColor"] },
                React.createElement(ColorPanel, null)),
            React.createElement(Block, { title: locale === null || locale === void 0 ? void 0 : locale["settings.content"], options: [
                    { name: "settings.navbar", value: "navbar" },
                    { name: "settings.menu", value: "menu" },
                    { name: "settings.footer", value: "footer" },
                    { name: "settings.menuWidth", value: "menuWidth", type: "number" },
                ] }),
            React.createElement(Block, { title: locale === null || locale === void 0 ? void 0 : locale["settings.otherSettings"], options: [{ name: "settings.colorWeek", value: "colorWeek" }] }),
            React.createElement(Alert, { content: locale === null || locale === void 0 ? void 0 : locale["settings.alertContent"] }))));
}
export default Setting;
