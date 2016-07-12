"use strict";
var Converter = (function () {
    function Converter(dom, activePlugins) {
        this._activePlugins = activePlugins;
    }
    Converter.prototype.registerPlugin = function (plugin) {
    };
    Converter.prototype.makeHtml = function (text) {
        return "";
    };
    return Converter;
}());
exports.Converter = Converter;
