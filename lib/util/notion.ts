import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Post } from "../interface";
import { PageObject } from "../responses";

const client = new Client({
  auth: "secret_G9OMFLlC2ryFhKITJIQzwhWnUQWdk3cliljlYXeyS27",
});

export async function getAllBlocksById(
  blockId: string
): Promise<BlockObjectResponse[]> {
  let allBlocks: BlockObjectResponse[];
  const res = await client.blocks.children.list({ block_id: blockId });
  allBlocks = res.results.filter((result): result is BlockObjectResponse => {
    return result.type !== undefined;
  });
  return allBlocks;
}

function _validPageObject(pageObject: PageObject): boolean {
  const properties = pageObject.properties;
  return properties.summary.rich_text.length > 0;
}

function _buildPost(pageObject: PageObject): Post {
  let coverImageURL = "";
  let summary = "";
  if (pageObject.cover !== null) {
    if (pageObject.cover.external) {
      coverImageURL = pageObject.cover.external.url;
    }
    if (pageObject.cover.file) {
      coverImageURL = pageObject.cover.file.url;
    }
  }
  pageObject.properties.summary.rich_text.forEach((summary_text) => {
    summary += summary_text.plain_text;
  });
  const post: Post = {
    id: pageObject.id,
    title: pageObject.properties.Name.title[0].plain_text,
    createdTs: pageObject.created_time,
    lastEditedTs: pageObject.last_edited_time,
    summary: summary,
    coverImageURL: coverImageURL,
    tags: pageObject.properties.tags,
  };
  return post;
}

export async function getPosts(databaseId: string): Promise<Post[]> {
  try {
    const response = await client.databases.query({
      database_id: databaseId,
    });
    return response.results
      .filter((pageObject) => _validPageObject(pageObject))
      .map((pageObject) => _buildPost(pageObject));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}

export async function getPostById(
  database_id: string,
  post_id: string
): Promise<Post> {
  try {
    const response = await client.pages.retrieve({ page_id: post_id });
    return _buildPost(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}
