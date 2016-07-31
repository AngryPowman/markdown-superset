/**
 * MarkdownLexing - Rewrite token lexing
 * Copyright (C) 2016-2048, AngryPowman. (MIT Licensed)
 * https://github.com/AngryPowman/markdown-superset
 */

module MarkdownSuperset {


  export class MarkdownLexing {

    public static initilize(): void {
      marked.prototype.constructor.Lexer.prototype.token = function (src, top, bq) {
        var src = src.replace(/^ +$/gm, '')
          , next
          , loose
          , cap
          , bull
          , b
          , item
          , space
          , i
          , l;

        var lineCount = 0;
        while (src) {
          // newline
          if (cap = this.rules.newline.exec(src)) {
            src = src.substring(cap[0].length);
            if (cap[0].length > 1) {
              this.tokens.push({
                type: 'space'
              });
            }
          }

          // code
          if (cap = this.rules.code.exec(src)) {
            src = src.substring(cap[0].length);
            cap = cap[0].replace(/^ {4}/gm, '');
            lineCount += (cap[0].match(/\n/g) || []).length || 1;
            this.tokens.push({
              type: 'code',
              text: !this.options.pedantic
                ? cap.replace(/\n+$/, '')
                : cap,
              line: lineCount
            });
            continue;
          }

          // fences (gfm)
          if (cap = this.rules.fences.exec(src)) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;
            this.tokens.push({
              type: 'code',
              lang: cap[2],
              text: cap[3] || '',
              line: lineCount
            });
            continue;
          }

          // heading
          if (cap = this.rules.heading.exec(src)) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.push({
              type: 'heading',
              depth: cap[1].length,
              text: cap[2],
              line: lineCount
            });
            continue;
          }

          // table no leading pipe (gfm)
          if (top && (cap = this.rules.nptable.exec(src))) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            item = {
              type: 'table',
              header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
              align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
              cells: cap[3].replace(/\n$/, '').split('\n'),
              line: lineCount
            };

            for (i = 0; i < item.align.length; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }

            for (i = 0; i < item.cells.length; i++) {
              item.cells[i] = item.cells[i].split(/ *\| */);
            }

            this.tokens.push(item);

            continue;
          }

          // lheading
          if (cap = this.rules.lheading.exec(src)) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.push({
              type: 'heading',
              depth: cap[2] === '=' ? 1 : 2,
              text: cap[1],
              line: lineCount
            });
            continue;
          }

          // hr
          if (cap = this.rules.hr.exec(src)) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.push({
              type: 'hr',
              line: lineCount
            });
            continue;
          }

          // blockquote
          if (cap = this.rules.blockquote.exec(src)) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.push({
              type: 'blockquote_start'
            });

            cap = cap[0].replace(/^ *> ?/gm, '');

            // Pass `top` to keep the current
            // "toplevel" state. This is exactly
            // how markdown.pl works.
            this.token(cap, top, true);

            this.tokens.push({
              type: 'blockquote_end',
              line: lineCount
            });

            continue;
          }

          // list
          if (cap = this.rules.list.exec(src)) {
            src = src.substring(cap[0].length);
            bull = cap[2];
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.push({
              type: 'list_start',
              ordered: bull.length > 1,
              line: lineCount
            });

            // Get each top-level item.
            cap = cap[0].match(this.rules.item);

            next = false;
            l = cap.length;
            i = 0;

            for (; i < l; i++) {
              item = cap[i];

              // Remove the list item's bullet
              // so it is seen as the next token.
              space = item.length;
              item = item.replace(/^ *([*+-]|\d+\.) +/, '');

              // Outdent whatever the
              // list item contains. Hacky.
              if (~item.indexOf('\n ')) {
                space -= item.length;
                item = !this.options.pedantic
                  ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
                  : item.replace(/^ {1,4}/gm, '');
              }

              // Determine whether the next list item belongs here.
              // Backpedal if it does not belong in this list.
              if (this.options.smartLists && i !== l - 1) {
                b = this.rules.bullet.exec(cap[i + 1])[0];
                if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                  src = cap.slice(i + 1).join('\n') + src;
                  i = l - 1;
                }
              }

              // Determine whether item is loose or not.
              // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
              // for discount behavior.
              loose = next || /\n\n(?!\s*$)/.test(item);
              if (i !== l - 1) {
                next = item.charAt(item.length - 1) === '\n';
                if (!loose) loose = next;
              }

              this.tokens.push({
                type: loose
                  ? 'loose_item_start'
                  : 'list_item_start'
              });

              // Recurse.
              this.token(item, false, bq);

              this.tokens.push({
                type: 'list_item_end'
              });
            }

            this.tokens.push({
              type: 'list_end'
            });

            continue;
          }

          // html
          if (cap = this.rules.html.exec(src)) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.push({
              type: this.options.sanitize
                ? 'paragraph'
                : 'html',
              pre: !this.options.sanitizer
              && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
              text: cap[0],
              line: lineCount
            });
            continue;
          }

          // def
          if ((!bq && top) && (cap = this.rules.def.exec(src))) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.links[cap[1].toLowerCase()] = {
              href: cap[2],
              title: cap[3],
              line: lineCount
            };
            continue;
          }

          // table (gfm)
          if (top && (cap = this.rules.table.exec(src))) {
            src = src.substring(cap[0].length);

            item = {
              type: 'table',
              header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
              align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
              cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
            };

            for (i = 0; i < item.align.length; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }

            for (i = 0; i < item.cells.length; i++) {
              item.cells[i] = item.cells[i]
                .replace(/^ *\| *| *\| *$/g, '')
                .split(/ *\| */);
            }

            this.tokens.push(item);

            continue;
          }

          // top-level paragraph
          if (top && (cap = this.rules.paragraph.exec(src))) {
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.push({
              type: 'paragraph',
              text: cap[1].charAt(cap[1].length - 1) === '\n'
                ? cap[1].slice(0, -1)
                : cap[1],
              line: lineCount
            });
            continue;
          }

          // text
          if (cap = this.rules.text.exec(src)) {
            // Top-level should never reach here.
            src = src.substring(cap[0].length);
            lineCount += (cap[0].match(/\n/g) || []).length || 1;

            this.tokens.push({
              type: 'text',
              text: cap[0],
              line: lineCount
            });
            continue;
          }

          if (src) {
            throw new
              Error('Infinite loop on byte: ' + src.charCodeAt(0));
          }
        }

        return this.tokens;
      }

      marked.prototype.constructor.Parser.prototype.tok = function () {
        switch (this.token.type) {
          case 'space': {
            return '';
          }
          case 'hr': {
            return this.renderer.hr(this.token.line);
          }
          case 'heading': {
            return this.renderer.heading(
              this.inline.output(this.token.text),
              this.token.depth,
              this.token.text,
              this.token.line);
          }
          case 'code': {
            return this.renderer.code(this.token.text,
              this.token.lang,
              this.token.escaped,
              this.token.line);
          }
          case 'table': {
            var header = ''
              , body = ''
              , i
              , row
              , cell
              , flags
              , j;

            // header
            cell = '';
            for (i = 0; i < this.token.header.length; i++) {
              flags = { header: true, align: this.token.align[i] };
              cell += this.renderer.tablecell(
                this.inline.output(this.token.header[i]),
                { header: true, align: this.token.align[i] }
              );
            }
            header += this.renderer.tablerow(cell);

            for (i = 0; i < this.token.cells.length; i++) {
              row = this.token.cells[i];

              cell = '';
              for (j = 0; j < row.length; j++) {
                cell += this.renderer.tablecell(
                  this.inline.output(row[j]),
                  { header: false, align: this.token.align[j] }
                );
              }

              body += this.renderer.tablerow(cell);
            }
            return this.renderer.table(header, body, this.token.line);
          }
          case 'blockquote_start': {
            var body = '';

            while (this.next().type !== 'blockquote_end') {
              body += this.tok();
            }

            return this.renderer.blockquote(body, this.token.line);
          }
          case 'list_start': {
            var body = ''
              , ordered = this.token.ordered;

            while (this.next().type !== 'list_end') {
              body += this.tok();
            }

            return this.renderer.list(body, ordered, this.token.line);
          }
          case 'list_item_start': {
            var body = '';

            while (this.next().type !== 'list_item_end') {
              body += this.token.type === 'text'
                ? this.parseText()
                : this.tok();
            }

            return this.renderer.listitem(body, this.token.line);
          }
          case 'loose_item_start': {
            var body = '';

            while (this.next().type !== 'list_item_end') {
              body += this.tok();
            }

            return this.renderer.listitem(body, this.token.line);
          }
          case 'html': {
            var html = !this.token.pre && !this.options.pedantic
              ? this.inline.output(this.token.text)
              : this.token.text;
            return this.renderer.html(html, this.token.line);
          }
          case 'paragraph': {
            return this.renderer.paragraph(this.inline.output(this.token.text), this.token.line);
          }
          case 'text': {
            return this.renderer.paragraph(this.parseText(), this.token.line);
          }
        }
      };

      // =======================================================
      //  * Renderer 
      // =======================================================
      marked.prototype.constructor.Renderer.prototype.blockquote = function (quote, line) {
        return '<blockquote source-line="' + line + '">\n' + quote + '</blockquote>\n';
      };

      marked.prototype.constructor.Renderer.prototype.html = function (html, line) {
        return '<div source-line="' + line + '">\n' + html + '</div>';
      };

      marked.prototype.constructor.Renderer.prototype.heading = function (text, level, raw, line) {
        return '<h'
          + level
          + ' source-line="' + line + '"'
          + ' id="'
          + this.options.headerPrefix
          + raw.toLowerCase().replace(/[^\w]+/g, '-')
          + '">'
          + text
          + '</h'
          + level
          + '>\n';
      };

      marked.prototype.constructor.Renderer.prototype.hr = function (line) {
        return this.options.xhtml ? '<hr source-line="' + line + '"/>\n' : '<hr' + " source-line=" + line + '>\n';
      };

      marked.prototype.constructor.Renderer.prototype.list = function (body, ordered, line) {
        var type = ordered ? 'ol' : 'ul';
        return '<' + type + ' source-line="' + line + '">\n' + body + '</' + type + '>\n';
      };

      marked.prototype.constructor.Renderer.prototype.listitem = function (text, line) {
        return '<li ' + 'source-line="' + line + '">' + text + '</li>\n';
      };

      marked.prototype.constructor.Renderer.prototype.paragraph = function (text, line) {
        return '<p ' + 'source-line="' + line + '">' + text + '</p>\n';
      };

      marked.prototype.constructor.Renderer.prototype.table = function (header, body, line) {
        return '<table ' + 'source-line="' + line + '">\n'
          + '<thead>\n'
          + header
          + '</thead>\n'
          + '<tbody>\n'
          + body
          + '</tbody>\n'
          + '</table>\n';
      };

      marked.prototype.constructor.Renderer.prototype.tablerow = function (content, line) {
        return '<tr ' + 'source-line="' + line + '">\n' + content + '</tr>\n';
      };

      marked.prototype.constructor.Renderer.prototype.tablecell = function (content, flags, line) {
        var type = flags.header ? 'th' : 'td';
        var tag = flags.align
          ? '<' + type + ' source-line="' + line + '" style="text-align:' + flags.align + '">'
          : '<' + type + ' source-line="' + line + '">';
        return tag + content + '</' + type + '>\n';
      };

      // span level renderer
      marked.prototype.constructor.Renderer.prototype.strong = function (text, line) {
        return '<strong ' + 'source-line="' + line + '">' + text + '</strong>';
      };

      marked.prototype.constructor.Renderer.prototype.em = function (text, line) {
        return '<em ' + 'source-line="' + line + '">' + text + '</em>';
      };

      marked.prototype.constructor.Renderer.prototype.codespan = function (text, line) {
        return '<code ' + 'source-line="' + line + '">' + text + '</code>';
      };

      marked.prototype.constructor.Renderer.prototype.br = function (line) {
        return this.options.xhtml ? '<br ' + 'source-line="' + line + '"/>' : '<br ' + 'source-line="' + line + '">';
      };

      marked.prototype.constructor.Renderer.prototype.del = function (text, line) {
        return '<del ' + 'source-line="' + line + '">' + text + '</del>';
      };

      marked.prototype.constructor.Renderer.prototype.link = function (href, title, text, line) {
        if (this.options.sanitize) {
          try {
            var prot = decodeURIComponent(unescape(href))
              .replace(/[^\w:]/g, '')
              .toLowerCase();
          } catch (e) {
            return '';
          }
          if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
            return '';
          }
        }
        var out = '<a ' + 'source-line="' + line + '" href="' + href + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
      };

      marked.prototype.constructor.Renderer.prototype.image = function (href, title, text, line) {
        var out = '<img ' + 'source-line="' + line + '" src="' + href + '" alt="' + text + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
      };

      marked.prototype.constructor.Renderer.prototype.text = function (text, line) {
        return text;
      };
    }

  }
}
