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
import React, { useEffect } from "react";
import { Table, Typography, Button, DatePicker, Input, Breadcrumb, Card, } from "@arco-design/web-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { UPDATE_FORM_PARAMS, UPDATE_LIST, UPDATE_LOADING, UPDATE_PAGINATION, } from "./redux/actionTypes";
import useLocale from "../../utils/useLocale";
import styles from "./style/index.module.less";
function SearchTable() {
    var locale = useLocale();
    var columns = [
        {
            title: locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.name"],
            dataIndex: "name",
        },
        {
            title: locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.workflow"],
            dataIndex: "workflow",
            render: function (value) { return React.createElement(Typography.Text, { copyable: true }, value); },
        },
        {
            title: locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.period"],
            dataIndex: "period",
        },
        {
            title: locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.statistic"],
            dataIndex: "statistic",
        },
        {
            title: locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.createdTime"],
            dataIndex: "createdTime",
        },
        {
            title: locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.deadline"],
            dataIndex: "deadline",
        },
        {
            title: locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.operations"],
            dataIndex: "operations",
            render: function () { return (React.createElement("div", { className: styles.operations },
                React.createElement(Button, { type: "text", size: "small" }, locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.operations.view"]),
                React.createElement(Button, { type: "text", size: "small" }, locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.operations.update"]),
                React.createElement(Button, { type: "text", status: "danger", size: "small" }, locale === null || locale === void 0 ? void 0 : locale["searchTable.columns.operations.delete"]))); },
        },
    ];
    var searchTableState = useSelector(function (state) { return state.searchTable; });
    var data = searchTableState.data, pagination = searchTableState.pagination, loading = searchTableState.loading, formParams = searchTableState.formParams;
    var dispatch = useDispatch();
    useEffect(function () {
        fetchData();
    }, []);
    function fetchData(current, pageSize, params) {
        if (current === void 0) { current = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        if (params === void 0) { params = {}; }
        dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
        axios
            .get("/api/policy", {
            params: __assign({ page: current, pageSize: pageSize }, params),
        })
            .then(function (res) {
            dispatch({ type: UPDATE_LIST, payload: { data: res.data.list } });
            dispatch({
                type: UPDATE_PAGINATION,
                payload: {
                    pagination: __assign(__assign({}, pagination), { current: current, pageSize: pageSize, total: res.data.total }),
                },
            });
            dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
            dispatch({ type: UPDATE_FORM_PARAMS, payload: { params: params } });
        });
    }
    function onChangeTable(pagination) {
        var current = pagination.current, pageSize = pagination.pageSize;
        fetchData(current, pageSize, formParams);
    }
    function onSearch(keyword) {
        fetchData(1, pagination.pageSize, { keyword: keyword });
    }
    function onDateChange(date) {
        var start = date[0], end = date[1];
        fetchData(1, pagination.pageSize, {
            createdTimeStart: start,
            createdTimeEnd: end,
        });
    }
    return (React.createElement("div", { className: styles.container },
        React.createElement(Breadcrumb, { style: { marginBottom: 20 } },
            React.createElement(Breadcrumb.Item, null, locale === null || locale === void 0 ? void 0 : locale["menu.list"]),
            React.createElement(Breadcrumb.Item, null, locale === null || locale === void 0 ? void 0 : locale["menu.list.searchTable"])),
        React.createElement(Card, { bordered: false },
            React.createElement("div", { className: styles.toolbar },
                React.createElement("div", null,
                    React.createElement(Button, { type: "primary" }, locale === null || locale === void 0 ? void 0 : locale["searchTable.addPolicy"])),
                React.createElement("div", null,
                    React.createElement(DatePicker.RangePicker, { style: { marginRight: 8 }, onChange: onDateChange }),
                    React.createElement(Input.Search, { style: { width: 300 }, searchButton: true, placeholder: locale === null || locale === void 0 ? void 0 : locale["searchTable.placeholder.name"], onSearch: onSearch }))),
            React.createElement(Table, { rowKey: "id", loading: loading, onChange: onChangeTable, pagination: pagination, columns: columns, data: data }))));
}
export default SearchTable;
