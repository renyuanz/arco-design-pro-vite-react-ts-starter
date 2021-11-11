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
import React from "react";
import { Trigger, Typography } from "@arco-design/web-react";
import { SketchPicker } from "react-color";
import { generate, getRgbStr } from "@arco-design/color";
import { useSelector, useDispatch } from "react-redux";
import useLocale from "../../utils/useLocale";
import styles from "./style/color-panel.module.less";
function ColorPanel() {
    var theme = document.querySelector("body").getAttribute("arco-theme") || "light";
    var settings = useSelector(function (state) { return state.global.settings; });
    var locale = useLocale();
    var themeColor = settings.themeColor;
    var list = generate(themeColor, { list: true });
    var dispatch = useDispatch();
    return (React.createElement("div", null,
        React.createElement(Trigger, { trigger: "hover", position: "bl", popup: function () { return (React.createElement(SketchPicker, { color: themeColor, onChangeComplete: function (color) {
                    var newColor = color.hex;
                    dispatch({
                        type: "update-settings",
                        payload: { settings: __assign(__assign({}, settings), { themeColor: newColor }) },
                    });
                    var newList = generate(newColor, {
                        list: true,
                        dark: theme === "dark",
                    });
                    newList.forEach(function (l, index) {
                        var rgbStr = getRgbStr(l);
                        document.body.style.setProperty("--arcoblue-" + (index + 1), rgbStr);
                    });
                } })); } },
            React.createElement("div", { className: styles.input },
                React.createElement("div", { className: styles.color, style: { backgroundColor: themeColor } }),
                React.createElement("span", null, themeColor))),
        React.createElement("ul", { className: styles.ul }, list.map(function (item, index) { return (React.createElement("li", { key: index, className: styles.li, style: { backgroundColor: item } })); })),
        React.createElement(Typography.Paragraph, { style: { fontSize: 12 } }, locale === null || locale === void 0 ? void 0 : locale["settings.color.tooltip"])));
}
export default ColorPanel;
