export interface PageObject {
  id: string;
  created_time: string;
  created_by: User;
  last_edited_time: string;
  last_edited_by: User;
  archived: boolean;
  cover: Cover;
  properties: PageProperty;
}

interface PageProperty {
  tags: Tags;
  summary: Summary;
  created_at: {
    id: string;
    type: string;
    created_time: string;
  };
  Name: {
    id: string;
    type: string;
    title: RichText[];
  };
}

interface Cover {
  type: string;
  external?: {
    url: string;
  };
  file?: {
    url: string;
  };
}

export interface User {
  object: string;
  id: string;
}

export interface Tags {
  id: string;
  type: string;
  multi_select: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Summary {
  id: string;
  type: string;
  rich_text: RichText[];
}

interface RichText {
  type: string;
  text: {
    content: string;
    link?: string;
  };
  annotations: Annotaions;
  plain_text: string;
  href?: string;
}

export interface Annotaions {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Paragraph {
  rich_text: RichText[];
  color: string;
  children?: BlockObject;
}

export interface Heading {
  rich_text: RichText[];
  color: string;
}

export interface Quote {
  rich_text: RichText[];
  color: string;
}

export interface Bookmark {
  url: string;
  caption: RichText[];
}

export interface Code {
  rich_text: RichText[];
  caption?: RichText[];
  language?: Language;
}

export interface Image {
  caption: RichText[];
  type: string;
  file?: File;
  external?: External;
  width?: number;
  height?: number;
}

export interface File {
  url: string;
  expirytime?: string;
}

export interface External {
  url: string;
}

type Language =
  | "abap"
  | "agda"
  | "arduino"
  | "assembly"
  | "bash"
  | "basic"
  | "bnf"
  | "c"
  | "c#"
  | "c++"
  | "clojure"
  | "coffeescript"
  | "coq"
  | "css"
  | "dart"
  | "dhall"
  | "diff"
  | "docker"
  | "ebnf"
  | "elixir"
  | "elm"
  | "erlang"
  | "f#"
  | "flow"
  | "fortran"
  | "gherkin"
  | "glsl"
  | "go"
  | "graphql"
  | "groovy"
  | "haskell"
  | "html"
  | "idris"
  | "java"
  | "javascript"
  | "json"
  | "julia"
  | "kotlin"
  | "latex"
  | "less"
  | "lisp"
  | "livescript"
  | "llvm ir"
  | "lua"
  | "makefile"
  | "markdown"
  | "markup"
  | "matlab"
  | "mathematica"
  | "mermaid"
  | "nix"
  | "objective-c"
  | "ocaml"
  | "pascal"
  | "perl"
  | "php"
  | "plain text"
  | "powershell"
  | "prolog"
  | "protobuf"
  | "purescript"
  | "python"
  | "r"
  | "racket"
  | "reason"
  | "ruby"
  | "rust"
  | "sass"
  | "scala"
  | "scheme"
  | "scss"
  | "shell"
  | "solidity"
  | "sql"
  | "swift"
  | "toml"
  | "typescript"
  | "vb.net"
  | "verilog"
  | "vhdl"
  | "visual basic"
  | "webassembly"
  | "xml"
  | "yaml"
  | "java/c/c++/c#";
