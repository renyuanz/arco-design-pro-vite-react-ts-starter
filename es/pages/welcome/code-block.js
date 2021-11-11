import React from 'react';
import { Button, Tooltip, Message } from '@arco-design/web-react';
import { IconCopy } from '@arco-design/web-react/icon';
import clipboard from '../../utils/clipboard';
import styles from './style/code-block.module.less';
export default function CodeBlock(props) {
    var code = props.code;
    return (React.createElement("pre", { className: styles['code-block'] },
        React.createElement("code", { className: styles['code-block-content'] }, code),
        React.createElement(Tooltip, { content: "\u70B9\u51FB\u590D\u5236\u547D\u4EE4" },
            React.createElement(Button, { type: "text", className: styles['code-block-copy-btn'], icon: React.createElement(IconCopy, null), onClick: function () {
                    clipboard(code);
                    Message.success('复制成功');
                } }))));
}
