import React, { useEffect } from "react";
import LoginForm from "./form";
// import Logo from "../../assets/logo.svg";

import styles from "./style/index.module.less";

export default () => {
  useEffect(() => {
    document.body.setAttribute("arco-theme", "light");
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {/* <Logo /> */}
        <div className={styles["logo-text"]}>ArcoDesign Pro</div>
      </div>
      <div className={styles.content}>
        <div className={styles["content-inner"]}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
