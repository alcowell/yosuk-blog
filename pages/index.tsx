import { Layout } from "@/lib/component/Layout";
import PostPage from "@/lib/component/PostPage";
import { Post } from "@/lib/interface";
import { getPosts } from "@/lib/util/notion";
import { GetStaticProps, InferGetStaticPropsType } from "next";

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

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export default Home;
