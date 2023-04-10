import {
  CodeBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ImageBlockObjectResponse,
  ParagraphBlockObjectResponse,
  QuoteBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Prism from "prismjs";
import { useEffect } from "react";

// type HeadingAny = Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse

export const Heading1 = ({ heading }: Heading1BlockObjectResponse) => {
  let content = "";
  if (heading.heading_1?.rich_text !== undefined) {
    content = heading.heading_1?.rich_text[0].plain_text;
  }
  return (
    <h2 className="md:text-5xl text-4xl font-noto font-bold py-5">{content}</h2>
  );
};

export const Heading2 = ({ heading }: Heading2BlockObjectResponse) => {
  let content = "";
  if (heading.heading_2?.rich_text !== undefined) {
    content = heading.heading_2?.rich_text[0].plain_text;
  }
  return (
    <h2 className="md:text-4xl text-3xl font-noto font-bold">{content}</h2>
  );
};

export const Heading3 = ({ heading }: Heading3BlockObjectResponse) => {
  let content = "";

  if (heading.heading_3?.rich_text !== undefined) {
    content = heading.heading_3?.rich_text[0].plain_text;
  }
  return (
    <h2 className="md:text-3xl text-2xl font-noto font-bold">{content}</h2>
  );
};

export const Paragraph = ({ paragraph }: ParagraphBlockObjectResponse) => {
  let content = "";
  if (
    paragraph.paragraph?.rich_text !== undefined &&
    paragraph.paragraph?.rich_text.length > 0
  ) {
    content = paragraph.paragraph?.rich_text[0].plain_text;
  }
  return <p className="md:text-2xl text-xl">{content}</p>;
};

export const ImageBlock = ({ image }: ImageBlockObjectResponse) => {
  let image_url = "";
  if (image?.image.type == "file") {
    image_url = image.image.file.url;
  } else {
    image_url = image.image.external.url;
  }
  console.log(image.image.file);
  return (
    <div className="justify-center items-center flex w-full">
      <Image src={image_url} width={200} height={200} />
    </div>
  );
};

export const Quote = ({ block }: QuoteBlockObjectResponse) => {
  let quote = "";
  if (
    block?.quote?.rich_text !== undefined &&
    block?.quote.rich_text.length > 0
  ) {
    block.quote.rich_text.forEach((text) => {
      quote += text.plain_text;
    });
  }
  return (
    <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50">
      <p className="md:text-xl italic font-medium leading-relaxed text-gray-700">
        {quote}
      </p>
    </blockquote>
  );
};

export const Code = ({ block }: CodeBlockObjectResponse) => {
  let code = "";
  let language = "";
  useEffect(() => {
    Prism.highlightAll();
  });

  if (block?.code.rich_text !== undefined && block?.code.rich_text.length > 0) {
    code = block.code.rich_text[0].plain_text;
    language = block.code.language;
  }
  return (
    <pre className={`lang-${language} rounded-md`}>
      <code>{code}</code>
    </pre>
  );
};
