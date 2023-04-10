import { Layout } from "@/lib/component/Layout";
import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageBlock,
  Paragraph,
  Quote,
} from "@/lib/component/notion-blocks";
import { Post } from "@/lib/interface";
import { getAllBlocksById, getPostById, getPosts } from "@/lib/util/notion";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticPaths, GetStaticProps } from "next";
import Prism from "prismjs";
import { useEffect } from "react";

type pathParams = {
  postId: string;
};

type blocksProps = {
  blocks: BlockObjectResponse[];
  post: Post;
};

export const getStaticPaths: GetStaticPaths<pathParams> = async () => {
  try {
    const posts = await getPosts("7c948cdaef8b42138f248995ecd5e275");
    const params = {
      paths: posts.map((post) => {
        return {
          params: {
            postId: post.id,
          },
        };
      }),
      fallback: "blocking",
    };
    return params;
  } catch (e) {
    console.error(`render failed in /`);
    if (e instanceof Error) {
      console.error(e.message);
    }
    throw e;
  }
};

export const getStaticProps: GetStaticProps<blocksProps> = async ({
  params,
}) => {
  const postId = params.postId;
  const allBlocks = await getAllBlocksById(postId);
  const post = await getPostById("7c948cdaef8b42138f248995ecd5e275", postId);
  return {
    props: {
      blocks: allBlocks,
      post: post,
    },
  };
};

const PostBody = ({ block }) => {
  switch (block.type) {
    case "heading_1":
      return <Heading1 heading={block} />;
    case "heading_2":
      return <Heading2 heading={block} />;
    case "heading_3":
      return <Heading3 heading={block} />;
    case "paragraph":
      return <Paragraph paragraph={block} />;
    case "image":
      return <ImageBlock image={block} />;
    case "quote":
      return <Quote block={block} />;
    case "code":
      return <Code block={block} />;
  }
  return <h2>{block.type}</h2>;
};

const Index = ({
  blocks,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageSrc: string = "https://source.unsplash.com/UOAvUQVNS60";
  const title = "Title";
  useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <Layout title={post.title}>
      <div className="px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="space-y-5 md:space-y-8">
          <div className="space-y-3">
            {blocks.map((block, i) => (
              <PostBody block={block} key={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
