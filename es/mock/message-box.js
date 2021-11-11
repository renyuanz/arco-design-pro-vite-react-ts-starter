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
import Mock from "mockjs";
import setupMock from "../utils/setupMock";
var haveReadIds = [];
var getMessageList = function () {
    return [
        {
            id: 1,
            type: "message",
            title: "郑曦月",
            subTitle: "的私信",
            avatar: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp",
            content: "审批请求已发送，请查收",
            time: "今天 12:30:01",
        },
        {
            id: 2,
            type: "message",
            title: "宁波",
            subTitle: "的回复",
            avatar: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
            content: "此处 bug 已经修复",
            time: "今天 12:30:01",
        },
        {
            id: 3,
            type: "message",
            title: "宁波",
            subTitle: "的回复",
            avatar: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
            content: "此处 bug 已经修复",
            time: "今天 12:20:01",
        },
        {
            id: 4,
            type: "approve",
            title: "域名服务",
            subTitle: "",
            avatar: "",
            content: "郑曦月申请开通 arco.design 域名",
            time: "今天 12:20:01",
        },
        {
            id: 5,
            type: "approve",
            title: "域名服务",
            subTitle: "",
            avatar: "",
            content: "郑曦月申请开通 arco.design 域名",
            time: "今天 12:20:01",
        },
        {
            id: 6,
            type: "approve",
            title: "域名服务",
            subTitle: "",
            avatar: "",
            content: "郑曦月申请开通 arco.design 域名",
            time: "今天 12:20:01",
        },
    ].map(function (item) { return (__assign(__assign({}, item), { status: haveReadIds.indexOf(item.id) === -1 ? 0 : 1 })); });
};
setupMock({
    setup: function () {
        Mock.mock(new RegExp("/api/message/list"), function () {
            return getMessageList();
        });
        Mock.mock(new RegExp("/api/message/read"), function (params) {
            var ids = JSON.parse(params.body).ids;
            haveReadIds.push.apply(haveReadIds, (ids || []));
            return true;
        });
    },
});
