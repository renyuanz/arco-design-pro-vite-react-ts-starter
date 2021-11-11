import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '../../utils/setupMock';
var Random = Mock.Random;
var data = Mock.mock({
    'list|55': [
        {
            'id|8': /[A-Z][a-z][-][0-9]/,
            'name|4-8': /[A-Z]/,
            'workflow|4': /[A-Z][a-z][-][0-9]/,
            period: Random.date('m') + " Min",
            'statistic|1-4': /[1-9]/,
            status: Random.pick(['success', 'pending', 'failed']),
            createdTime: Random.datetime(),
            deadline: Random.datetime(),
        },
    ],
});
setupMock({
    setup: function () {
        Mock.mock(new RegExp('/api/policy'), function (params) {
            var _a = qs.parseUrl(params.url).query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c;
            var p = page;
            var ps = pageSize;
            return {
                list: data.list.slice((p - 1) * ps, p * ps),
                total: 55,
            };
        });
    },
});
