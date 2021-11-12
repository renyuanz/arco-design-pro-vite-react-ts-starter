import {
  Alert,
  Card,
  Link,
  Typography,
  Tag,
  Image,
} from "@arco-design/web-react";
import { IconDoubleRight } from "@arco-design/web-react/icon";
import React from "react";
import { useSelector } from "react-redux";
import { ReducerState } from "../../redux";
import styles from "./style/index.module.less";

export default function Welcome() {
  const userInfo =
    useSelector((state: ReducerState) => state.global.userInfo) || {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          Welcome
        </Typography.Title>
        <Typography.Text type="secondary">
          {/* {userInfo.name}, {userInfo.email} */}
        </Typography.Text>
      </div>
      <div className={styles.content}>
        <Card style={{ marginTop: 20 }}></Card>
      </div>
    </div>
  );
}
