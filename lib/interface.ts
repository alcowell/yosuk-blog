import * as responses from "./responses";

export interface Block {
  object: string;
  id: string;
  created_time: string;
  created_by: responses.User;
  last_edited_by: responses.User;
  has_chidlren: boolean;
  archived: boolean;
  type: string;

  paragraph?: responses.Paragraph;
  heading_1?: responses.Heading;
  heading_2?: responses.Heading;
  heading_3?: responses.Heading;
  quote?: responses.Quote;
  code?: responses.Code;
  bookmark?: responses.Bookmark;
  image?: responses.Image;
}

export interface Post {
  id: string;
  title: string;
  createdTs: string;
  lastEditedTs: string;
  summary: string;
  coverImageURL: string;
  tags: responses.Tags;
}

export interface Block {
  id: string;
  type: string;
  hasChildren: boolean;
  archived: boolean;
  paragraph?: responses.Paragraph;
  heading_1?: responses.Heading;
  heading_2?: responses.Heading;
  heading_3?: responses.Heading;
  code?: responses.Code;
  bookmark?: responses.Bookmark;
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
