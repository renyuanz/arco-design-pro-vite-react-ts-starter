import { Form, Input, Checkbox, Link, Button, Space, } from "@arco-design/web-react";
import { IconLock, IconUser } from "@arco-design/web-react/icon";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./style/index.module.less";
import { useHistory } from "react-router";
export default function LoginForm() {
    var history = useHistory();
    var formRef = useRef();
    var _a = useState(""), errorMessage = _a[0], setErrorMessage = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(false), rememberPassword = _c[0], setRememberPassword = _c[1];
    function afterLoginSuccess(params) {
        // 记住密码
        if (rememberPassword) {
            localStorage.setItem("loginParams", JSON.stringify(params));
        }
        else {
            localStorage.removeItem("loginParams");
        }
        // 记录登录状态
        localStorage.setItem("userStatus", "login");
        // 跳转首页
        window.location.href = history.createHref({
            pathname: "/",
        });
    }
    function login(params) {
        setErrorMessage("");
        setLoading(true);
        axios
            .post("/api/user/login", params)
            .then(function (res) {
            var _a = res.data, status = _a.status, msg = _a.msg;
            if (status === "ok") {
                afterLoginSuccess(params);
            }
            else {
                setErrorMessage(msg || "登录出错，请刷新重试");
            }
        })
            .finally(function () {
            setLoading(false);
        });
    }
    function onSubmitClick() {
        formRef.current.validate().then(function (values) {
            login(values);
        });
    }
    // 读取 localStorage，设置初始值
    useEffect(function () {
        var params = localStorage.getItem("loginParams");
        var rememberPassword = !!params;
        setRememberPassword(rememberPassword);
        if (formRef.current && rememberPassword) {
            var parseParams = JSON.parse(params);
            formRef.current.setFieldsValue(parseParams);
        }
    }, []);
    return (React.createElement("div", { className: styles["login-form-wrapper"] },
        React.createElement("div", { className: styles["login-form-title"] }, "\u767B\u5F55 Arco Design Pro"),
        React.createElement("div", { className: styles["login-form-sub-title"] }, "\u767B\u5F55 Arco Design Pro"),
        React.createElement("div", { className: styles["login-form-error-msg"] }, errorMessage),
        React.createElement(Form, { className: styles["login-form"], layout: "vertical", ref: formRef },
            React.createElement(Form.Item, { field: "userName", rules: [{ required: true, message: "用户名不能为空" }] },
                React.createElement(Input, { prefix: React.createElement(IconUser, null), placeholder: "\u7528\u6237\u540D\uFF1Aadmin", onPressEnter: onSubmitClick })),
            React.createElement(Form.Item, { field: "password", rules: [{ required: true, message: "密码不能为空" }] },
                React.createElement(Input.Password, { prefix: React.createElement(IconLock, null), placeholder: "\u5BC6\u7801\uFF1Aadmin", onPressEnter: onSubmitClick })),
            React.createElement(Space, { size: 16, direction: "vertical" },
                React.createElement("div", { className: styles["login-form-password-actions"] },
                    React.createElement(Checkbox, { checked: rememberPassword, onChange: setRememberPassword }, "\u8BB0\u4F4F\u5BC6\u7801"),
                    React.createElement(Link, null, "\u5FD8\u8BB0\u5BC6\u7801\uFF1F")),
                React.createElement(Button, { type: "primary", long: true, onClick: onSubmitClick, loading: loading }, "\u767B\u5F55"),
                React.createElement(Button, { type: "text", long: true, className: styles["login-form-register-btn"] }, "\u6CE8\u518C\u8D26\u53F7")))));
}
