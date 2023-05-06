import { Client } from '@notionhq/client';
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import axios from 'axios';
import cheerio from 'cheerio';
import {
  Annotation,
  Block,
  Bookmark,
  BookmarkOgp,
  BulletedListItem,
  Code,
  Equation,
  External,
  File,
  Heading,
  Image,
  Ogp,
  Paragraph,
  Post,
  Quote,
  RichText,
  Tag,
  Text,
} from '../interface';

const client = new Client({
  auth: process.env.NOTION_SECERT_KEY,
});

async function fetchOGP(url: string): Promise<Ogp> {
  const ogp: Ogp = { title: '', image: '', description: '' };
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const metaTags = $("meta[property^='og:']");

    metaTags.each((_, tag) => {
      const property = $(tag).attr('property');
      const content = $(tag).attr('content');
      if (property !== undefined && content !== undefined) {
        switch (property) {
          case 'og:image': {
            ogp['image'] = content;
            break;
          }
          case 'og:description': {
            ogp['description'] = content;
            break;
          }
          case 'og:title': {
            ogp['title'] = content;
            break;
          }
        }
      }
    });

    return ogp;
  } catch (e) {
    console.log(e);
    return ogp;
  }
}

export async function getAllBlocksById(blockId: string): Promise<Block[]> {
  const res = await client.blocks.children.list({ block_id: blockId });
  const allBlocksPromises: Promise<Block>[] = res.results
    .filter((result): result is BlockObjectResponse => {
      return 'type' in result;
    })
    .map(_buildBlock);
  const allBlocks = Promise.all(allBlocksPromises);
  return allBlocks;
}

function _validPageObject(pageObject: PageObjectResponse): boolean {
  const properties = pageObject.properties;
  if ('summary' in properties && 'rich_text' in properties.summary) {
    return properties.summary.rich_text.length > 0;
  } else {
    return false;
  }
}

function _buildRichText(richTextObject: RichTextItemResponse): RichText {
  const annotation: Annotation = {
    bold: richTextObject.annotations.bold,
    italic: richTextObject.annotations.italic,
    strikethrough: richTextObject.annotations.strikethrough,
    underline: richTextObject.annotations.underline,
    code: richTextObject.annotations.code,
    color: richTextObject.annotations.color,
  };

  const richText: RichText = {
    type: richTextObject.type,
    annotations: annotation,
    plain_text: richTextObject.plain_text,
    href: richTextObject.href !== null ? richTextObject.href : '',
  };

  if (richTextObject.type === 'text') {
    const text: Text = {
      content: richTextObject.text.content,
    };

    if (richTextObject.text.link) {
      text.link = {
        url: richTextObject.text.link.url,
      };
    }

    richText.text = text;
  } else if (richTextObject.type === 'equation') {
    const equation: Equation = {
      expression: richTextObject.equation.expression,
    };
    richText.equation = equation;
  }

  return richText;
}

async function _buildBlock(
  blockObjectResponse: BlockObjectResponse
): Promise<Block> {
  const block: Block = {
    type: blockObjectResponse.type,
    id: blockObjectResponse.id,
    created_time: blockObjectResponse.created_time,
    created_by: blockObjectResponse.created_by,
    archived: blockObjectResponse.archived,
    has_chidlren: blockObjectResponse.has_children,
  };

  switch (blockObjectResponse.type) {
    case 'heading_1': {
      const heading_1: Heading = {
        color: blockObjectResponse.heading_1.color,
        rich_text: blockObjectResponse.heading_1.rich_text.map(_buildRichText),
      };
      block.heading_1 = heading_1;
      break;
    }
    case 'heading_2': {
      const heading_2: Heading = {
        color: blockObjectResponse.heading_2.color,
        rich_text: blockObjectResponse.heading_2.rich_text.map(_buildRichText),
      };
      block.heading_2 = heading_2;
      break;
    }
    case 'heading_3': {
      const heading_3: Heading = {
        color: blockObjectResponse.heading_3.color,
        rich_text: blockObjectResponse.heading_3.rich_text.map(_buildRichText),
      };
      block.heading_3 = heading_3;
      break;
    }
    case 'paragraph': {
      const paragraph: Paragraph = {
        color: blockObjectResponse.paragraph.color,
        rich_text: blockObjectResponse.paragraph.rich_text.map(_buildRichText),
      };
      block.paragraph = paragraph;
      break;
    }
    case 'image': {
      const image: Image = {
        type: blockObjectResponse.image.type,
      };

      if (blockObjectResponse.image.type == 'file') {
        const file: File = {
          url: blockObjectResponse.image.file.url,
          expirytime:
            blockObjectResponse.image.file.expiry_time !== undefined
              ? blockObjectResponse.image.file.expiry_time
              : '',
        };
        image.file = file;
      }
      if (blockObjectResponse.image.type == 'external') {
        const external: External = {
          url: blockObjectResponse.image.external.url,
        };
        image.external = external;
      }
      block.image = image;
      break;
    }
    case 'quote': {
      const quote: Quote = {
        rich_text: blockObjectResponse.quote.rich_text.map(_buildRichText),
        color: blockObjectResponse.quote.color,
      };
      block.quote = quote;
      break;
    }
    case 'code': {
      const code: Code = {
        rich_text: blockObjectResponse.code.rich_text.map(_buildRichText),
        caption: blockObjectResponse.code.caption.map(_buildRichText),
        language: blockObjectResponse.code.language,
      };
      block.code = code;
      break;
    }
    case 'bookmark': {
      const bookmark: Bookmark = {
        url: blockObjectResponse.bookmark.url,
        caption: blockObjectResponse.bookmark.caption.map(_buildRichText),
      };
      const ogp: Ogp = await fetchOGP(blockObjectResponse.bookmark.url);
      const bookmarkOgp: BookmarkOgp = {
        bookmark,
        ogp,
      };
      block.bookmark = bookmarkOgp;
      break;
    }
    case 'bulleted_list_item': {
      const bulletedListItem: BulletedListItem = {
        color: blockObjectResponse.bulleted_list_item.color,
        rich_text:
          blockObjectResponse.bulleted_list_item.rich_text.map(_buildRichText),
      };
      block.bulleted_list_item = bulletedListItem;
      break;
    }
  }
  return block;
}

function _buildPost(pageObject: PageObjectResponse): Post {
  let coverImageURL = '';
  let summary = '';
  let title = '';
  let tags: Tag[] = [{ id: '', name: '', color: '' }];
  if (pageObject.cover !== null) {
    if ('external' in pageObject.cover) {
      coverImageURL = pageObject.cover.external.url;
    }
    if ('file' in pageObject.cover) {
      coverImageURL = pageObject.cover.file.url;
    }
  }
  if (
    'summary' in pageObject.properties &&
    'rich_text' in pageObject.properties.summary
  )
    pageObject.properties.summary.rich_text.forEach((summary_text) => {
      summary += summary_text.plain_text;
    });
  if (
    'Name' in pageObject.properties &&
    'title' in pageObject.properties.Name
  ) {
    title = pageObject.properties.Name.title[0].plain_text;
  }
  if (
    'tags' in pageObject.properties &&
    'multi_select' in pageObject.properties.tags
  ) {
    tags = pageObject.properties.tags.multi_select;
  }
  const post: Post = {
    id: pageObject.id,
    title,
    createdTs: pageObject.created_time,
    lastEditedTs: pageObject.last_edited_time,
    summary: summary,
    coverImageURL: coverImageURL,
    tags,
  };
  return post;
}

function _isPageObject(
  value: PageObjectResponse | PartialPageObjectResponse
): value is PageObjectResponse {
  return 'properties' in value;
}

export async function getPosts(databaseId: string): Promise<Post[]> {
  try {
    const response = await client.databases.query({
      database_id: databaseId,
    });
    const pageObjects = response.results.filter((pageObject) =>
      _isPageObject(pageObject)
    ) as PageObjectResponse[];
    return pageObjects
      .filter((pageObject) => _validPageObject(pageObject))
      .map((pageObject) => _buildPost(pageObject));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}

export async function getPostById(post_id: string): Promise<Post> {
  try {
    const response = await client.pages.retrieve({ page_id: post_id });
    if (_isPageObject(response)) {
      return _buildPost(response);
    } else {
      throw new Error(`Cannot get post ${post_id}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}

export const fetchBlock = async (blockId: string): Promise<Block> => {
  try {
    const { data: block } = await axios(`/api/blocks/${blockId}`);
    return block as Block;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const isExpired = (block: Block): boolean => {
  const now = Date.now();

  if (block.type === 'image') {
    const image = block.image;
    if (
      image?.file &&
      image.file.expirytime &&
      Date.parse(image.file.expirytime) < now
    ) {
      return true;
    }
  }
  return false;
};
