/// <reference path="../globals/marked/index.d.ts" />
declare function unescape(html);
declare function escape(html, encode);

interface MarkedStatic {
    // Lexer: {
    //     new (options): Lexer;
    // }

    InlineLexer: {
        new (links, options): InlineLexer;
    }
}

interface MarkedRenderer {
    options: any;
}

interface Lexer {
    tokens: any[];
    options: any;
    rules: any;
}

interface InlineLexer {

}


