import { Alert, Card, Link, Typography, Tag, Image, } from "@arco-design/web-react";
import { IconDoubleRight } from "@arco-design/web-react/icon";
import React from "react";
import { useSelector } from "react-redux";
import useLocale from "../../utils/useLocale";
import imgWorkplace from "../../assets/workplace.png";
import CodeBlock from "./code-block";
import styles from "./style/index.module.less";
export default function Welcome() {
    var locale = useLocale();
    var userInfo = useSelector(function (state) { return state.global.userInfo; }) || {};
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.header },
            React.createElement(Typography.Title, { heading: 5, style: { marginTop: 0 } }, locale === null || locale === void 0 ? void 0 : locale["welcome.title.welcome"]),
            React.createElement(Typography.Text, { type: "secondary" },
                userInfo.name,
                ", ",
                userInfo.email)),
        React.createElement("div", { className: styles.content },
            React.createElement(Alert, { type: "success", content: locale === null || locale === void 0 ? void 0 : locale["welcome.invite"] }),
            React.createElement(Card, { style: { marginTop: 20 }, bordered: false, title: locale === null || locale === void 0 ? void 0 : locale["welcome.usage"] },
                React.createElement(Typography.Title, { heading: 6, style: { marginTop: 0 } },
                    "1. ", locale === null || locale === void 0 ? void 0 :
                    locale["welcome.step.title.pickup"]),
                React.createElement(Typography.Text, null, locale === null || locale === void 0 ? void 0 :
                    locale["welcome.step.content.pickup"],
                    React.createElement(Tag, { style: { marginLeft: 8 } }, "@arco-design/pro-pages-workplace")),
                React.createElement(Typography.Title, { heading: 6 },
                    "2. ", locale === null || locale === void 0 ? void 0 :
                    locale["welcome.step.title.install"]),
                React.createElement(Typography.Text, null, locale === null || locale === void 0 ? void 0 : locale["welcome.step.content.install"]),
                React.createElement(CodeBlock, { code: "arco block use @arco-design/pro-pages-workplace" }),
                React.createElement(Typography.Title, { heading: 6, style: { marginTop: 0 } },
                    "3. ", locale === null || locale === void 0 ? void 0 :
                    locale["welcome.step.title.result"]),
                React.createElement(Typography.Text, null, locale === null || locale === void 0 ? void 0 : locale["welcome.step.content.result"]),
                React.createElement("div", { style: { marginTop: "1em" } },
                    React.createElement(Image, { preview: false, width: 600, src: imgWorkplace }))),
            React.createElement(Card, { style: { marginTop: 20 } },
                React.createElement(Typography.Text, null, locale === null || locale === void 0 ? void 0 : locale["welcome.title.material"]),
                React.createElement("div", { style: { marginTop: 8 } },
                    React.createElement(Link, { target: "_blank", href: "https://arco.design/material?category=arco-design-pro" }, locale === null || locale === void 0 ? void 0 :
                        locale["welcome.link.material-pro"],
                        " ",
                        React.createElement(IconDoubleRight, null))),
                React.createElement("div", { style: { marginTop: 8 } },
                    React.createElement(Link, { target: "_blank", href: "https://arco.design/material" }, locale === null || locale === void 0 ? void 0 :
                        locale["welcome.link.material-all"],
                        " ",
                        React.createElement(IconDoubleRight, null)))))));
}
