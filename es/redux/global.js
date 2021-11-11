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
import defaultSettings from '../settings.json';
var defaultTheme = localStorage.getItem('arco-theme') || 'light';
function changeTheme(newTheme) {
    if ((newTheme || defaultTheme) === 'dark') {
        document.body.setAttribute('arco-theme', 'dark');
    }
    else {
        document.body.removeAttribute('arco-theme');
    }
}
// init page theme
changeTheme();
var initialState = {
    theme: defaultTheme,
    settings: defaultSettings,
};
export default function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'toggle-theme': {
            var theme = action.payload.theme;
            if (theme === 'light' || theme === 'dark') {
                localStorage.setItem('arco-theme', theme);
                changeTheme(theme);
            }
            return __assign(__assign({}, state), { theme: theme });
        }
        case 'update-settings': {
            var settings = action.payload.settings;
            return __assign(__assign({}, state), { settings: settings });
        }
        default:
            return state;
    }
}
