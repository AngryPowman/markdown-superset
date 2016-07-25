interface MermaidStatic {
  init(config: any, selector: string);
  initialize(config: any);
}

declare module "mermaid" {
  export = mermaid;
}

declare var mermaid: MermaidStatic;