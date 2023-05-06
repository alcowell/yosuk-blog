import { useRouter } from 'next/router';
import { Post } from '../interface';

const PostPage: React.FunctionComponent<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const date = new Date(post.createdTs);
  return (
    <div className="space-y-4 lg:divide-y lg:divide-gray-100">
      <div className="md:pt-8 sm:flex lg:items-end group">
        <div className="mb-4 sm:mr-4">
          <a href={`/post/${post.id}`}>
            <img
              className="rounded-md object-cover h-40 w-full md:h-40 md:w-40 hover:opacity-80"
              src={post.coverImageURL}
              style={{ objectFit: 'cover', overflow: 'hidden' }}
              alt="topic"
              height={200}
              width={200}
            />
          </a>
        </div>
        <div className="px-2">
          <span className="md:text-lg text-sm text-gray-500">
            {date.getFullYear().toString() +
              '/' +
              (date.getMonth() + 1).toString() +
              '/' +
              date.getDate().toString()}
          </span>
          <p className="md:mt-3 mt-2 md:text-lg text-sm font-medium leading-6 font-noto">
            <a
              href={`/post/${post.id}`}
              className="md:text-2xl text-lg text-gray-800 group-hover:text-gray-500"
            >
              {post.title}
            </a>
          </p>
          <p className="md:mt-2 mt-1 md:text-xl text-sm text-gray-500 mt-2 font-noto">
            {post.summary}
          </p>
          {post.tags.map((tag, i) => {
            return (
              <span
                className={
                  'inline-block bg-gray-200 rounded-full px-3 py-1 md:text-sm text-xs font-semibold text-gray-700 mr-2 mb-2 mt-4'
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

export default PostPage;
