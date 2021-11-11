import React from "react";
import { List, Avatar, Typography, Button, Space, } from "@arco-design/web-react";
import useLocale from "../../utils/useLocale";
function MessageList(props) {
    var locale = useLocale();
    var data = props.data, unReadData = props.unReadData, defaultAvatar = props.avatar;
    function onItemClick(item, index) {
        if (item.status)
            return;
        props.onItemClick && props.onItemClick(item, index);
    }
    function onAllBtnClick() {
        props.onAllBtnClick && props.onAllBtnClick(unReadData, data);
    }
    return (React.createElement(List, { bordered: false, footer: unReadData.length ? (React.createElement("div", { style: { textAlign: "center" } },
            React.createElement(Button, { type: "text", onClick: onAllBtnClick }, locale === null || locale === void 0 ? void 0 : locale["messageBox.allRead"]))) : null }, data.map(function (item, index) { return (React.createElement(List.Item, { key: item.id, actionLayout: "vertical", style: {
            opacity: item.status ? 0.5 : 1,
        } },
        React.createElement("div", { style: {
                cursor: "pointer",
            }, onClick: function () {
                onItemClick(item, index);
            } },
            React.createElement(List.Item.Meta, { avatar: item.avatar ? (React.createElement(Avatar, { shape: "circle" },
                    React.createElement("img", { src: item.avatar }))) : (defaultAvatar), title: React.createElement(Space, { size: 4 },
                    React.createElement("span", null, item.title),
                    React.createElement(Typography.Text, { type: "secondary" }, item.subTitle)), description: React.createElement("div", null,
                    React.createElement("div", null, item.content),
                    React.createElement(Typography.Text, { type: "secondary" }, item.time)) })))); })));
}
export default MessageList;
