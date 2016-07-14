(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MarkdownEditor = (function () {
        function MarkdownEditor() {
        }
        return MarkdownEditor;
    }());
    exports.MarkdownEditor = MarkdownEditor;
});

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MarkdownExtraPlugin = (function () {
        function MarkdownExtraPlugin(name) {
        }
        return MarkdownExtraPlugin;
    }());
    exports.MarkdownExtraPlugin = MarkdownExtraPlugin;
});

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MarkdownManager = (function () {
        function MarkdownManager(parser) {
        }
        MarkdownManager.prototype.registerPlugin = function (plugin) {
            if (!this._activePlugins.indexOf(plugin)) {
                this._activePlugins.push(plugin);
            }
        };
        MarkdownManager.prototype.registerPlugins = function (plugins) {
        };
        return MarkdownManager;
    }());
    exports.MarkdownManager = MarkdownManager;
    ;
});

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MarkdownParser = (function () {
        function MarkdownParser() {
        }
        MarkdownParser.prototype.makeHtml = function (text) {
            return this.converter.makeHtml(text);
        };
        return MarkdownParser;
    }());
    exports.MarkdownParser = MarkdownParser;
});

/// <reference path="typings/index.d.ts" />
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./src/markdown-parser", "./src/markdown-extra-plugin", "./src/markdown-editor", "./src/markdown-manager"], factory);
    }
})(function (require, exports) {
    "use strict";
    var markdown_parser_1 = require("./src/markdown-parser");
    var markdown_extra_plugin_1 = require("./src/markdown-extra-plugin");
    var markdown_editor_1 = require("./src/markdown-editor");
    var markdown_manager_1 = require("./src/markdown-manager");
    var MarkdownSuperset;
    (function (MarkdownSuperset) {
        // export function init(parser: MarkdownParser): MarkdownManager {
        //   return new MarkdownManager(parser);
        // }
        MarkdownSuperset.Parser = markdown_parser_1.MarkdownParser;
        MarkdownSuperset.Editor = markdown_editor_1.MarkdownEditor;
        MarkdownSuperset.ExtraPlugin = markdown_extra_plugin_1.MarkdownExtraPlugin;
        MarkdownSuperset.Manager = markdown_manager_1.MarkdownManager;
    })(MarkdownSuperset || (MarkdownSuperset = {}));
});
