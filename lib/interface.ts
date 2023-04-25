export interface Block {
  id: string;
  created_time: string;
  created_by: User;
  has_chidlren: boolean;
  archived: boolean;
  type: string;

  paragraph?: Paragraph;
  heading_1?: Heading;
  heading_2?: Heading;
  heading_3?: Heading;
  quote?: Quote;
  code?: Code;
  bookmark?: BookmarkOgp;
  image?: Image;
  bulleted_list_item?: BulletedListItem;
}

export interface BookmarkOgp {
  bookmark: Bookmark;
  ogp: Ogp;
}

export interface Ogp {
  title: string;
  image: string;
  description: string;
}

export interface Post {
  id: string;
  title: string;
  createdTs: string;
  lastEditedTs: string;
  summary: string;
  coverImageURL: string;
  tags: Tag[];
}

export type Content =
  | {
      type: "paragraph" | "quote" | "heading_1" | "heading_2" | "heading_3";
      text: string | null;
      link: string | null;
    }
  | {
      type: "code";
      text: string | null;
      link: string | null;
      language: string | null;
    }
  | {
      type: "bookmark";
      link: string | null;
      title: string | null;
      description: string | null;
      ogpImageUrl: string | null;
    };

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

export interface Annotation {
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
  children?: Block;
}

export interface BulletedListItem {
  rich_text: RichText[];
  color: string;
  children?: Block;
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

export interface File {
  url: string;
  expirytime?: string;
}

export interface External {
  url: string;
}

export interface Image {
  file?: File;
  external?: External;
  type: string;
}

export interface RichText {
  type: string;
  text?: Text;
  annotations: Annotation;
  plain_text: string;
  href?: string;
  equation?: Equation;
}

export interface Link {
  url: string;
}

export interface Text {
  content: string;
  link?: Link;
}

export interface Equation {
  expression: string;
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
