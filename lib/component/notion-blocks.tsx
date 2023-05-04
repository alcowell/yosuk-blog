import Image from "next/image";
import Prism from "prismjs";
import { useEffect } from "react";
import useSWR from "swr";
import { Block, BulletedListItem, RichText } from "../interface";
import { fetchBlock, isExpired } from "../util/notion";

export const RichTextContent = ({
  richText,
  className,
  language,
}: {
  richText: RichText;
  className: string;
  language?: string;
}) => {
  if (richText.annotations.code) {
    if (language !== undefined) {
      return (
        <pre className={`lang-${language} rounded-md text-sm md:text-base`}>
          <code>{richText.text?.content}</code>
        </pre>
      );
    } else {
      return (
        <pre className="inline bg-gray-200 p-1 font-semibold whitespace-pre-wrap text-sm md:text-base">
          <code>{richText.text?.content}</code>
        </pre>
      );
    }
  }

  let element;

  if (richText.type == "text") {
    if (richText.href) {
      className = className.replace(/text-gray-800/g, "");
      className += " font-medium text-blue-600 hover:underline";
    }
    element = <p className={className}>{richText.text?.content}</p>;
  } else if (richText.type == "equation") {
    element = <p className={className}>{richText.equation?.expression}</p>;
  } else {
    element = null;
  }

  if (richText.annotations.bold) {
    element = <b>{element}</b>;
  }
  if (richText.annotations.italic) {
    element = <i>{element}</i>;
  }
  if (richText.annotations.strikethrough) {
    element = <s>{element}</s>;
  }
  if (richText.annotations.underline) {
    element = <u>{element}</u>;
  }
  if (richText.annotations.color && richText.annotations.color !== "default") {
    element = (
      <span className={`text-${richText.annotations.color}`}>{element}</span>
    );
  }

  if (richText.href) {
    element = <a href={richText.href}>{element}</a>;
  }
  return element;
};

export const Heading1 = ({ block }: { block: Block }) => {
  let className =
    "md:text-4xl text-2xl font-noto text-gray-800 font-bold md:pt-5 pt-3 pb-3 md:pb-2";
  return (
    <>
      {block.heading_1?.rich_text.map((rich_text: RichText, i: number) => (
        <RichTextContent className={className} key={i} richText={rich_text} />
      ))}
    </>
  );
};

export const Heading2 = ({ block }: { block: Block }) => {
  let className = "md:text-3xl text-xl font-noto font-bold";
  return (
    <>
      {block.heading_2?.rich_text.map((rich_text: RichText, i: number) => (
        <RichTextContent className={className} key={i} richText={rich_text} />
      ))}
    </>
  );
};

export const Heading3 = ({ block }: { block: Block }) => {
  let className = "md:text-2xl text-lg font-noto font-bold";
  return (
    <>
      {block.heading_3?.rich_text.map((rich_text: RichText, i: number) => (
        <RichTextContent className={className} key={i} richText={rich_text} />
      ))}
    </>
  );
};

export const Paragraph = ({ block }: { block: Block }) => {
  let className =
    "md:text-xl text-base font-noto text-gray-800 leading-relaxed md:leading-relaxed inline";
  return (
    <div className="pt-2">
      {block.paragraph?.rich_text.map((rich_text: RichText, i: number) => (
        <RichTextContent className={className} key={i} richText={rich_text} />
      ))}
    </div>
  );
};

export const ImageBlock = ({ initialBlock }: { initialBlock: Block }) => {
  const { data: block } = useSWR(
    isExpired(initialBlock) && initialBlock.id,
    fetchBlock,
    {
      fallbackData: initialBlock,
    }
  );

  let url = "";
  if (block.image?.type == "file") {
    url = block.image.file?.url !== undefined ? block.image.file?.url : "";
  } else if (block.image?.type == "external") {
    url =
      block.image.external?.url !== undefined ? block.image.external.url : "";
  }
  return (
    <div className="justify-center items-center flex w-full">
      <img src={url} className="object-cover" alt="imageblock" />
    </div>
  );
};

export const Quote = ({ block }: { block: Block }) => {
  let className = "md:text-xl italic font-medium leading-relaxed text-gray-700";
  return (
    <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50">
      {block.quote?.rich_text.map((rich_text: RichText, i: number) => (
        <RichTextContent className={className} key={i} richText={rich_text} />
      ))}
    </blockquote>
  );
};

export const Code = ({ block }: { block: Block }) => {
  useEffect(() => {
    Prism.highlightAll();
  });
  const className = "";
  const language = block.code?.language;

  return (
    <>
      {block.code?.rich_text.map((rich_text: RichText, i: number) => {
        rich_text.annotations.code = true;
        return (
          <RichTextContent
            className={className}
            key={i}
            richText={rich_text}
            language={language}
          />
        );
      })}
    </>
  );
};

export const Bookmark = ({ block }: { block: Block }) => {
  const ogpImage = block.bookmark?.ogp.image;
  const ogpTitle = block.bookmark?.ogp.title;
  const ogpDescription = block.bookmark?.ogp.description;
  return (
    <a href={block.bookmark?.bookmark.url}>
      <div className="grid h-auto grid-cols-3 border bg-white shadow-sm my-4">
        <div className="col-span-2 w-10/12 flex flex-none overflow-hidden truncate">
          <div className="flex flex-col p-2">
            <p className="text-sm font-bold text-gray-800 md:text-lg">
              {ogpTitle}
            </p>
            <p className="mt-1 truncate text-xs text-gray-800 md:text-base">
              {ogpDescription}
            </p>
            <div className="pt-3 sm:pt-8">
              <p className="text-xs text-gray-500 truncate">
                {block.bookmark?.bookmark.url}
              </p>
            </div>
          </div>
        </div>
        <div className="relative col-span-1 flex-shrink-0 overflow-hidden px-1">
          {ogpImage !== "" && ogpImage !== undefined ? (
            <Image
              className="absolute top-0 h-full w-full object-cover"
              src={ogpImage}
              alt="image"
              fill
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </a>
  );
};

export const BulletedList = ({ block }: { block: Block }) => {
  const className =
    "md:text-xl text-base font-noto text-gray-800 leading-relaxed md:leading-relaxed inline";

  return (
    <ul className="list-disc list-inside text-gray-900">
      {block.list?.listItems.map(
        (bulletedList: BulletedListItem, i: number) => {
          return (
            <li key={i} className="gap-x-1">
              {bulletedList.rich_text.map((richText: RichText, k: number) => {
                return (
                  <RichTextContent
                    className={className}
                    richText={richText}
                    key={k}
                  />
                );
              })}
            </li>
          );
        }
      )}
    </ul>
  );
};
