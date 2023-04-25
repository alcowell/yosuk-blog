import { Block } from "../interface";
import {
  Bookmark,
  BulletedList,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageBlock,
  Paragraph,
  Quote,
} from "./notion-blocks";

const PostBlock = ({ block }: { block: Block }) => {
  switch (block.type) {
    case "heading_1":
      return <Heading1 block={block} />;
    case "heading_2":
      return <Heading2 block={block} />;
    case "heading_3":
      return <Heading3 block={block} />;
    case "paragraph":
      return <Paragraph block={block} />;
    case "image":
      return <ImageBlock initialBlock={block} />;
    case "quote":
      return <Quote block={block} />;
    case "code":
      return <Code block={block} />;
    case "bookmark":
      return <Bookmark block={block} />;
    case "bulleted_list_item":
      return <BulletedList block={block} />;
  }
  return <h2>{block.type}</h2>;
};

export default PostBlock;
