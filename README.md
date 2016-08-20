## Overview
A markdown extension library for supporting more advanced features through plugins way.

----

## Dependencies
- marked
- highlight.js
- mermaid
- katex

## Installation
Install via [npm](https://www.npmjs.com/package/github) ![NPM version](https://badge.fury.io/js/github.svg):
```
$ npm install markdown-superset
```

or Install via git clone
```
$ git clone https://github.com/AngryPowman/markdown-superset.git
$ cd markdown-superset
$ npm install
$ typings install
$ gulp build
```

Reference the script in your index.html:
```
<script src="node_modules/markdown-superset/dist/markdown-superset.min.js"></script>
```

## Demo
To run the demo:
$ cd node_modules/markdown-superset
$ npm start

* Notice: You may install `python` first.

## Declaration File for TypeScript
`/// <reference path="node_modules/markdown-superset/dist/markdown-superset.d.ts" />`