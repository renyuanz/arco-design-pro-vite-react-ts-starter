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
import { Switch, Divider, InputNumber } from "@arco-design/web-react";
import { useSelector, useDispatch } from "react-redux";
import useLocale from "../../utils/useLocale";
import styles from "./style/block.module.less";
export default function Block(props) {
    var title = props.title, options = props.options, children = props.children;
    var locale = useLocale();
    var settings = useSelector(function (state) { return state.global.settings; });
    var dispatch = useDispatch();
    return (React.createElement("div", { className: styles.block },
        React.createElement("h5", { className: styles.title }, title),
        options &&
            options.map(function (option) {
                var type = option.type || "switch";
                return (React.createElement("div", { className: styles.switchWrapper, key: option.value },
                    React.createElement("span", null, locale === null || locale === void 0 ? void 0 : locale[option.name]),
                    type === "switch" && (React.createElement(Switch, { size: "small", checked: !!settings[option.value], onChange: function (checked) {
                            var _a;
                            var newSetting = __assign(__assign({}, settings), (_a = {}, _a[option.value] = checked, _a));
                            dispatch({
                                type: "update-settings",
                                payload: { settings: newSetting },
                            });
                            // set color week
                            if (checked && option.value === "colorWeek") {
                                document.body.style.filter = "invert(80%)";
                            }
                            if (!checked && option.value === "colorWeek") {
                                document.body.style.filter = "none";
                            }
                        } })),
                    type === "number" && (React.createElement(InputNumber, { style: { width: 80 }, size: "small", value: settings.menuWidth, onChange: function (value) {
                            var _a;
                            var newSetting = __assign(__assign({}, settings), (_a = {}, _a[option.value] = value, _a));
                            dispatch({
                                type: "update-settings",
                                payload: { settings: newSetting },
                            });
                        } }))));
            }),
        children,
        React.createElement(Divider, null)));
}
