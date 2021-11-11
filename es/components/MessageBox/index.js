import React, { useEffect, useState } from "react";
import axios from "axios";
import { groupBy } from "lodash";
import { Dropdown, Badge, Tabs, Menu, Avatar, Spin, } from "@arco-design/web-react";
import { IconNotification, IconMessage, IconCustomerService, IconFile, IconDesktop, } from "@arco-design/web-react/icon";
import useLocale from "../../utils/useLocale";
import MessageList from "./list";
import styles from "./style/index.module.less";
function DropContent() {
    var locale = useLocale();
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    var _b = useState({}), groupData = _b[0], setGroupData = _b[1];
    var _c = useState([]), sourceData = _c[0], setSourceData = _c[1];
    function fetchSourceData(showLoading) {
        if (showLoading === void 0) { showLoading = true; }
        showLoading && setLoading(true);
        axios
            .get("/api/message/list")
            .then(function (res) {
            setSourceData(res.data);
        })
            .finally(function () {
            showLoading && setLoading(false);
        });
    }
    function readMessage(data) {
        var ids = data.map(function (item) { return item.id; });
        axios
            .post("/api/message/read", {
            ids: ids,
        })
            .then(function () {
            fetchSourceData();
        });
    }
    useEffect(function () {
        fetchSourceData();
    }, []);
    useEffect(function () {
        var groupData = groupBy(sourceData, "type");
        setGroupData(groupData);
    }, [sourceData]);
    var tabList = [
        {
            key: "message",
            title: locale === null || locale === void 0 ? void 0 : locale["messageBox.tab.title.message"],
            titleIcon: React.createElement(IconMessage, null),
        },
        {
            key: "notice",
            title: locale === null || locale === void 0 ? void 0 : locale["messageBox.tab.title.notice"],
            titleIcon: React.createElement(IconCustomerService, null),
        },
        {
            key: "approve",
            title: locale === null || locale === void 0 ? void 0 : locale["messageBox.tab.title.approve"],
            titleIcon: React.createElement(IconFile, null),
            avatar: (React.createElement(Avatar, { style: { backgroundColor: "#0FC6C2" } },
                React.createElement(IconDesktop, null))),
        },
    ];
    return (React.createElement(Spin, { loading: loading, style: { width: "100%" } },
        React.createElement(Tabs, { type: "rounded", defaultActiveTab: "message", destroyOnHide: true }, tabList.map(function (item) {
            var key = item.key, title = item.title, titleIcon = item.titleIcon, avatar = item.avatar;
            var data = groupData[key] || [];
            var unReadData = data.filter(function (item) { return !item.status; });
            return (React.createElement(Tabs.TabPane, { key: key, title: React.createElement("span", null,
                    titleIcon,
                    title,
                    unReadData.length ? "(" + unReadData.length + ")" : "") },
                React.createElement(MessageList, { data: data, unReadData: unReadData, avatar: avatar, onItemClick: function (item) {
                        readMessage([item]);
                    }, onAllBtnClick: function (unReadData) {
                        readMessage(unReadData);
                    } })));
        }))));
}
function MessageBox() {
    return (React.createElement(Dropdown, { trigger: "click", droplist: React.createElement(Menu, { className: styles.messageBox },
            React.createElement(DropContent, null)), position: "br", triggerProps: {
            autoFitPosition: false,
        } },
        React.createElement("div", { className: styles.messageBoxTrigger },
            React.createElement(Badge, { count: 9, dot: true },
                React.createElement(IconNotification, null)))));
}
export default MessageBox;
