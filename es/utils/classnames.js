import { isArray, isObject, isString } from './is';
export default function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var length = args.length;
    var classNames = [];
    var _loop_1 = function (i) {
        var v = args[i];
        if (!v) {
            return "continue";
        }
        if (isString(v)) {
            classNames.push(v);
        }
        else if (isArray(v)) {
            classNames = classNames.concat(v);
        }
        else if (isObject(v)) {
            Object.keys(v).forEach(function (k) {
                if (v[k]) {
                    classNames.push(k);
                }
            });
        }
        else {
            throw new Error('arguments must be one of string/array/object.');
        }
    };
    for (var i = 0; i < length; i++) {
        _loop_1(i);
    }
    return classNames.join(' ');
}
