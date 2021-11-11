import { PaginationProps } from '@arco-design/web-react/es/Pagination/pagination';
interface FormParams {
    [key: string]: string;
}
export interface SearchTableState {
    data?: any[];
    pagination?: PaginationProps;
    formParams?: FormParams;
    loading?: boolean;
}
export default function (state: {
    data: any[];
    pagination: {
        sizeCanChange: boolean;
        showTotal: boolean;
        pageSize: number;
        current: number;
        pageSizeChangeResetCurrent: boolean;
    };
    loading: boolean;
    formParams: {};
}, action: any): {
    data: any;
    pagination: {
        sizeCanChange: boolean;
        showTotal: boolean;
        pageSize: number;
        current: number;
        pageSizeChangeResetCurrent: boolean;
    };
    loading: boolean;
    formParams: {};
} | {
    loading: any;
    data: any[];
    pagination: {
        sizeCanChange: boolean;
        showTotal: boolean;
        pageSize: number;
        current: number;
        pageSizeChangeResetCurrent: boolean;
    };
    formParams: {};
} | {
    pagination: any;
    data: any[];
    loading: boolean;
    formParams: {};
} | {
    formParams: any;
    data: any[];
    pagination: {
        sizeCanChange: boolean;
        showTotal: boolean;
        pageSize: number;
        current: number;
        pageSizeChangeResetCurrent: boolean;
    };
    loading: boolean;
};
export {};
