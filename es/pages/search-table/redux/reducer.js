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
import { UPDATE_LIST, UPDATE_LOADING, UPDATE_PAGINATION, UPDATE_FORM_PARAMS } from './actionTypes';
var initialState = {
    data: [],
    pagination: {
        sizeCanChange: true,
        showTotal: true,
        pageSize: 10,
        current: 1,
        pageSizeChangeResetCurrent: true,
    },
    loading: true,
    formParams: {},
};
export default function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case UPDATE_LIST: {
            var data = action.payload.data;
            return __assign(__assign({}, state), { data: data });
        }
        case UPDATE_LOADING: {
            var loading = action.payload.loading;
            return __assign(__assign({}, state), { loading: loading });
        }
        case UPDATE_PAGINATION: {
            var pagination = action.payload.pagination;
            return __assign(__assign({}, state), { pagination: pagination });
        }
        case UPDATE_FORM_PARAMS: {
            var params = action.payload.params;
            return __assign(__assign({}, state), { formParams: params });
        }
        default:
            return state;
    }
}
