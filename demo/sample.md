MarkdownSuperset Features
============================
A markdown extension library for supporting more advanced features through plugins way.


Features
--------

### Common
* Supported Multi-markdown

### Editor (Based on ACE)
* Markdown Syntax highlighting
* Automatic indent and outdent
* Themes
* Search and replace with regular expressions

### Markdown (Advaced Features)
* Code Blocks with Syntax highlighting (Supported more than hundreds of languages)


Examples
--------

* Sequence Diagram
```
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

```
sequenceDiagram
    participant 法老之鹰
    participant 天使
    法老之鹰->>天使: 天降正义！
    天使-->>法老之鹰: 英雄不朽！
```


* Code Highlighting

```cpp
namespace MarkdownSuperset {
  class Greet {
    public Greet() {
      this->sayHello();
    }

    public virtual sayHello(atomic_long a) {
      std::cout << "nice" << std::endl;
    }
  }
}
```

```typescript
module MarkdownSuperset {
  export class Greet {
    constructor() {
      this.sayHello();
    }

    public sayHello() {
      alert("Hello World");
    }
  }
}
```