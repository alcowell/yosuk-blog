import { error } from 'console';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Error from 'next/error';
import { Layout } from '@/lib/component/Layout';
import PostBlock from '@/lib/component/PostBlock';
import { Block, Post } from '@/lib/interface';
import { getAllBlocksById, getPostById, getPosts } from '@/lib/util/notion';
import { wrapBlocks } from '@/lib/util/utils';

type blocksProps = {
  blocks: Block[];
  post: Post;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await getPosts('7c948cdaef8b42138f248995ecd5e275');
    const params = {
      paths: posts.map((post) => {
        return {
          params: {
            postId: post.id,
          },
        };
      }),
      fallback: false,
    };
    return params;
  } catch (e) {
    console.error(`render failed in /`);
    throw e;
  }
};

export const getStaticProps: GetStaticProps<blocksProps> = async ({
  params,
}) => {
  if (params !== undefined && typeof params.postId == 'string') {
    const postId = params.postId;
    const allBlocks = await getAllBlocksById(postId);
    const post = await getPostById(postId);
    return {
      props: {
        blocks: wrapBlocks(allBlocks),
        post: post,
      },
    };
  } else {
    throw error;
  }
};

const Index = ({
  blocks,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (post === undefined) {
    return <Error statusCode={500} />;
  }
  return (
    <Layout title={post.title} backgroundImage={post.coverImageURL}>
      <div className="px-4 pt-3 lg:pt-7 pb-4 sm:px-6 lg:px-8 mx-auto">
        <div className="space-y-5 md:space-y-8">
          <div className="space-y-3">
            {blocks.map((block, i) => {
              return <PostBlock block={block} key={i} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
