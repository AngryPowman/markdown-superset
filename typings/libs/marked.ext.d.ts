/// <reference path="../globals/marked/index.d.ts" />

// declare function escape(html, encode): void;
interface MarkedStatic {
    InlineLexer: {
        new (links, options): InlineLexer;
    }

}

interface MarkedRenderer {
    options: any;
}

interface InlineLexer {

}


