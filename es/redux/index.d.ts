import { GlobalState } from './global';
import { SearchTableState } from '../pages/search-table/redux/reducer';
export interface ReducerState {
    global: GlobalState;
    searchTable: SearchTableState;
}
declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    global: GlobalState | {
        theme: any;
        settings?: {
            colorWeek: boolean;
            navbar: boolean;
            menu: boolean;
            footer: boolean;
            themeColor: string;
            menuWidth: number;
        };
        userInfo?: {
            name?: string;
            avatar?: string;
            job?: string;
            organization?: string;
            location?: string;
            email?: string;
        };
    } | {
        settings: any;
        theme?: string;
        userInfo?: {
            name?: string;
            avatar?: string;
            job?: string;
            organization?: string;
            location?: string;
            email?: string;
        };
    };
    searchTable: {
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
}>, import("redux").AnyAction>;
export default _default;
