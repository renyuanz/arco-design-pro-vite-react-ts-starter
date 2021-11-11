import React, { useEffect } from "react";
import LoginForm from "./form";
// import Logo from "../../assets/logo.svg";
import styles from "./style/index.module.less";
export default (function () {
    useEffect(function () {
        document.body.setAttribute("arco-theme", "light");
    }, []);
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.logo },
            React.createElement("div", { className: styles["logo-text"] }, "Shopify Hunt")),
        React.createElement("div", { className: styles.content },
            React.createElement("div", { className: styles["content-inner"] },
                React.createElement(LoginForm, null)))));
});
