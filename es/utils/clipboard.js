// https://github.com/feross/clipboard-copy/blob/master/index.js
export default function clipboard(text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).catch(function (err) {
            throw err !== undefined
                ? err
                : new DOMException('The request is not allowed', 'NotAllowedError');
        });
    }
    var span = document.createElement('span');
    span.textContent = text;
    span.style.whiteSpace = 'pre';
    document.body.appendChild(span);
    var selection = window.getSelection();
    var range = window.document.createRange();
    selection.removeAllRanges();
    range.selectNode(span);
    selection.addRange(range);
    var success = false;
    try {
        success = window.document.execCommand('copy');
    }
    catch (err) {
        // eslint-disable-next-line
        console.log('error', err);
    }
    selection.removeAllRanges();
    window.document.body.removeChild(span);
    return success
        ? Promise.resolve()
        : Promise.reject(new DOMException('The request is not allowed', 'NotAllowedError'));
}
