import { Layout } from "@/lib/component/Layout";
import { Post } from "@/lib/interface";
import { getPosts } from "@/lib/util/notion";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type SSG = {
  message: string;
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  try {
    // const database = await getDatabaseData("7c948cdaef8b42138f248995ecd5e275");
    const posts = await getPosts("7c948cdaef8b42138f248995ecd5e275");
    return {
      props: {
        posts: posts,
      },
    };
  } catch (e) {
    console.error(`render failed in /`);
    if (e instanceof Error) {
      console.error(e.message);
    }
    throw e;
  }
};

const PostBody2: React.FunctionComponent<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const date = new Date(post.createdTs);
  return (
    <div className="space-y-8 lg:divide-y lg:divide-gray-100">
      <div className="pt-8 sm:flex lg:items-end group">
        <div className="mb-4 sm:mr-4">
          <Image
            className="rounded-md object-cover h-40 w-full md:h-40 md:w-40"
            src={post.coverImageURL}
            style={{ objectFit: "cover", overflow: "hidden" }}
            alt="text"
            height={200}
            width={200}
          />
        </div>
        <div className="px-2">
          <span className="text-lg text-gray-500">
            {date.getFullYear().toString() +
              "/" +
              (date.getMonth() + 1).toString() +
              "/" +
              date.getDate().toString()}
          </span>
          <p className="mt-3 text-lg font-medium leading-6 font-mplus">
            <a
              href={`/post/${post.id}`}
              className="text-xl text-gray-800 group-hover:text-gray-500 lg:text-3xl"
            >
              {post.title}
            </a>
          </p>
          <p className="mt-2 text-xl text-gray-500 mt-3">{post.summary}</p>
          {post.tags.multi_select.map((tag, i) => {
            return (
              <span
                className={
                  "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-3"
                }
                key={i}
              >
                #{tag.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageSrc: string = "https://source.unsplash.com/UOAvUQVNS60";
  const title = "Alcowell Toolbox";
  return (
    <Layout title={title}>
      <div className="divide-y divide-gray-500">
        {posts.map((post, i) => (
          <PostBody2 post={post} key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
