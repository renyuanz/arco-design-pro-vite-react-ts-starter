import React, { useState, useEffect } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ConfigProvider } from "@arco-design/web-react";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import enUS from "@arco-design/web-react/es/locale/en-US";
import ReactDOM from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import history from "./history";
import rootReducer from "./redux";

import PageLayout from "./layout/page-layout";
import { GlobalContext } from "./context";
import Login from "./pages/login";
import checkLogin from "./utils/checkLogin";
import "./style/index.less";
import "./mock";

const store = createStore(rootReducer);

function Index() {
  function fetchUserInfo() {
    axios.get("/api/user/userInfo").then((res) => {
      store.dispatch({
        type: "update-userInfo",
        payload: { userInfo: res.data },
      });
    });
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else {
      history.push("/user/login");
    }
  }, []);

  const contextValue = {};

  return (
    <Router history={history}>
      <ConfigProvider>
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/user/login" component={Login} />
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </Router>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
