export default (function (config) {
    var _a = config.mock, mock = _a === void 0 ? import.meta.env.MODE === "development" : _a, setup = config.setup;
    if (mock === false)
        return;
    setup();
});
