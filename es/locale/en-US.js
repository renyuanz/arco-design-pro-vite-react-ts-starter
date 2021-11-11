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
import localeSettings from './en-US/settings';
import localeMessageBox from '../components/MessageBox/locale/en-US';
import localeSearchTable from '../pages/search-table/locale/en-US';
import localeWelcome from '../pages/welcome/locale/en-US';
export default __assign(__assign(__assign(__assign({ 'menu.list': 'List', 'navbar.docs': 'Docs' }, localeSettings), localeMessageBox), localeSearchTable), localeWelcome);
