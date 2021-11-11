import React, { useRef, useState, forwardRef, useImperativeHandle, } from "react";
import { Progress } from "@arco-design/web-react";
function LoadingBar(_, ref) {
    var loadingTimer = useRef(null);
    var _a = useState(30), percent = _a[0], setPercent = _a[1];
    var _b = useState(true), hide = _b[0], setHide = _b[1];
    function loading() {
        setHide(false);
        setPercent(30);
        loadingTimer.current = setInterval(function () {
            if (percent <= 98) {
                setPercent(percent > 80 ? percent + 1 : percent + 10);
            }
        }, 1000);
    }
    function success() {
        clearInterval(loadingTimer.current);
        setPercent(100);
        setTimeout(function () {
            setHide(true);
        }, 300);
    }
    useImperativeHandle(ref, function () { return ({
        loading: loading,
        success: success,
    }); });
    return !hide ? (React.createElement(Progress, { percent: percent, showText: false, animation: true, style: { position: "absolute", height: 2, top: -1, zIndex: 9999 } })) : null;
}
export default forwardRef(LoadingBar);
