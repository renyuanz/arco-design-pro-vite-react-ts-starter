var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import Setting from "./components/Settings";
import { GlobalContext } from "./context";
import Login from "./pages/login";
import checkLogin from "./utils/checkLogin";
import "./style/index.less";
import "./mock";
var store = createStore(rootReducer);
function Index() {
    var localeName = localStorage.getItem("arco-lang") || "zh-CN";
    if (!localStorage.getItem("arco-lang")) {
        localStorage.setItem("arco-lang", localeName);
    }
    var _a = useState(), locale = _a[0], setLocale = _a[1];
    function fetchLocale(ln) {
        return __awaiter(this, void 0, void 0, function () {
            var locale;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import("./locale/" + (ln || localeName) + ".ts")];
                    case 1:
                        locale = (_a.sent()).default;
                        setLocale(locale);
                        return [2 /*return*/];
                }
            });
        });
    }
    function getArcoLocale() {
        switch (localeName) {
            case "zh-CN":
                return zhCN;
            case "en-US":
                return enUS;
            default:
                return zhCN;
        }
    }
    function fetchUserInfo() {
        axios.get("/api/user/userInfo").then(function (res) {
            store.dispatch({
                type: "update-userInfo",
                payload: { userInfo: res.data },
            });
        });
    }
    useEffect(function () {
        fetchLocale();
    }, []);
    useEffect(function () {
        if (checkLogin()) {
            fetchUserInfo();
        }
        else {
            history.push("/user/login");
        }
    }, []);
    var contextValue = {
        locale: locale,
    };
    return locale ? (React.createElement(Router, { history: history },
        React.createElement(ConfigProvider, { locale: getArcoLocale() },
            React.createElement(Provider, { store: store },
                React.createElement(GlobalContext.Provider, { value: contextValue },
                    React.createElement(Switch, null,
                        React.createElement(Route, { path: "/user/login", component: Login }),
                        React.createElement(Route, { path: "/", component: PageLayout })),
                    React.createElement(Setting, null)))))) : null;
}
ReactDOM.render(React.createElement(Index, null), document.getElementById("root"));
