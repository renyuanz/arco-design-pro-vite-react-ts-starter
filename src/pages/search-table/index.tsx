import React, { useEffect } from "react";
import {
  Table,
  Typography,
  Button,
  DatePicker,
  Input,
  Breadcrumb,
  Card,
} from "@arco-design/web-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from "./redux/actionTypes";
import { ReducerState } from "../../redux";
import styles from "./style/index.module.less";

function SearchTable() {
  const columns = [
    {
      title: "Policy name / policy ID",
      dataIndex: "name",
    },
    {
      title: "Workflow name / ID",
      dataIndex: "workflow",
      render: (value: string) => (
        <Typography.Text copyable>{value}</Typography.Text>
      ),
    },
    {
      title: "Statistical period",
      dataIndex: "period",
    },
    {
      title: "Statistics",
      dataIndex: "statistic",
    },
    {
      title: "CreatedTime",
      dataIndex: "createdTime",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
    },
    {
      title: "Operations",
      dataIndex: "operations",
      render: () => (
        <div className={styles.operations}>
          <Button type="text" size="small">
            View
          </Button>
          <Button type="text" size="small">
            Update
          </Button>
          <Button type="text" status="danger" size="small">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const searchTableState = useSelector(
    (state: ReducerState) => state.searchTable
  );

  const { data, pagination, loading, formParams } = searchTableState;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData(current = 1, pageSize = 10, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    axios
      .get(`/api/policy`, {
        params: {
          page: current,
          pageSize,
          ...params,
        },
      })
      .then((res) => {
        dispatch({ type: UPDATE_LIST, payload: { data: res.data.list } });
        dispatch({
          type: UPDATE_PAGINATION,
          payload: {
            pagination: {
              ...pagination,
              current,
              pageSize,
              total: res.data.total,
            },
          },
        });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      });
  }

  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }

  function onSearch(keyword) {
    fetchData(1, pagination.pageSize, { keyword });
  }

  function onDateChange(date) {
    const [start, end] = date;
    fetchData(1, pagination.pageSize, {
      createdTimeStart: start,
      createdTimeEnd: end,
    });
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>Search table</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button type="primary">Add policy</Button>
          </div>
          <div>
            <DatePicker.RangePicker
              style={{ marginRight: 8 }}
              onChange={onDateChange}
            />
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder={"Please enter policy name / ID"}
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}

export default SearchTable;
