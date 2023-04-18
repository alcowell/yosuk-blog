import { Layout } from "@/lib/component/Layout";
import PostPage from "@/lib/component/PostPage";
import { Post } from "@/lib/interface";
import { getPostsByTagId, getTagIds } from "@/lib/util/notion";
import { error } from "console";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Prism from "prismjs";
import { useEffect } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const tagIds = await getTagIds("7c948cdaef8b42138f248995ecd5e275");
    const params = {
      paths: tagIds.map((tagId) => {
        return {
          params: {
            tagId: tagId,
          },
        };
      }),
      fallback: true,
    };
    return params;
  } catch (e) {
    console.error(`render failed in /`);
    throw e;
  }
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async ({
  params,
}) => {
  if (params !== undefined && typeof params.tagId == "string") {
    const posts = await getPostsByTagId(
      "7c948cdaef8b42138f248995ecd5e275",
      params.tagId
    );
    return {
      props: {
        posts: posts,
      },
    };
  } else {
    throw error;
  }
};

const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    Prism.highlightAll();
  });
  const imageSrc: string = "https://source.unsplash.com/UOAvUQVNS60";
  const title = "日々のことと、技術のブログ";
  return (
    <Layout title={title} backgroundImage="/background.jpg">
      <div className="divide-y divide-gray-500">
        {posts.map((post: Post, i: number) => (
          <PostPage post={post} key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
