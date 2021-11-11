// 仅用于线上预览，实际使用中可以将此逻辑删除
import qs from 'query-string';
export default function getUrlParams() {
    var params = qs.parseUrl(window.location.href).query;
    var returnParams = {};
    Object.keys(params).forEach(function (p) {
        if (params[p] === 'true') {
            returnParams[p] = true;
        }
        if (params[p] === 'false') {
            returnParams[p] = false;
        }
    });
    return returnParams;
}
