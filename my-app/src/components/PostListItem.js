import { Link } from "react-router-dom";

const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden xl:block xl:w-1/3">
        {post.imageName ? (
          <img
            src={post.imageName}
            alt={post.title}
            className="rounded-2xl object-cover w-full h-[220px]"
            width="735"
          />
        ) : (
          <div className="rounded-2xl w-full h-[220px] bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="text-gray-300"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/post/${post.postId}`} className="text-4xl font-semibold">
          {post.title}
        </Link>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <span className="text-blue-800">{post.author_name}</span>
          <span>in</span>
          <span className="text-blue-800">{post.category?.categoryTitle}</span>
          <span>•</span>
          <span>{new Date(post.addedDate).toLocaleDateString()}</span>
        </div>

        <p className="text-gray-600 line-clamp-3">{post.content}</p>

        <Link to={`/post/${post.postId}`}>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Read More →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;