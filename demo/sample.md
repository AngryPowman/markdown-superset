## MarkdownSuperset Features
A markdown extension library for supporting more advanced features through plugins way.

## Markdown Features
MarkdownSuperset now supported GFM && CommonMark, more built-in plugins will be added in the future.


### Advaced Features
* Code Blocks with Syntax highlighting
* Generate diagrams && flowcharts using [*Mermaid*](http://knsv.github.io/mermaid/)
* Mathematics Formula

Examples
---

### Code Highlighting
Highligh the code blocks with the language you specified. Supported more than hundreds of languages.

```cpp
// Highlighting Example
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

### Mermaid (Diagrams && flowcharts)
**Mermaid** feature provide you a way to generate diagrams and flowcharts from text in a similar manner as markdown. See also: http://knsv.github.io/mermaid/#mermaid

#### Flowchart
---
```
graph TD;
  Start-->condition{Action}
  condition-->|True| R1[Result 1]
  condition-->|False| R2[Result 2]
  condition-->|Error| Start
  R2-->Start
  R1-->F[Finished]
```
[Sequence Diagram Syntax](http://knsv.github.io/mermaid/#sequence-diagrams)

#### Sequence Diagram
---
```
sequenceDiagram
    participant Client
    participant Server
    participant Database

    Client->>Server: Login Request
    activate Server
    Server->>Database: User Authentication
    activate Database
    Database-->>Server: Authentication Result
    deactivate Database
    Server-->>Client: Login Response
    deactivate Server
```
[Gantt Diagram Syntax](http://knsv.github.io/mermaid/#gant-diagrams)


#### Mathematical formula
Write an simple inline math: `$E = mc^2$`
Or try some greek letters : 
`$\alpha, \beta, \gamma, \pi, \phi, \varphi, \mu$`

More complex: 
`$\frac{-b\pm\sqrt{b^2-4ac}}{2a}$`

Math block:
```math
\oint_C x^3\, dx + 4y^2\, dy

2 = \left(
 \frac{\left(3-x\right) \times 2}{3-x}
 \right)

\sum_{m=1}^\infty\sum_{n=1}^\infty\frac{m^2\,n}
 {3^m\left(m\,3^n+n\,3^m\right)}

\phi_n(\kappa) =
 \frac{1}{4\pi^2\kappa^2} \int_0^\infty
 \frac{\sin(\kappa R)}{\kappa R}
 \frac{\partial}{\partial R}
 \left[R^2\frac{\partial D_n(R)}{\partial R}\right]\,dR
```