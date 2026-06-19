import { Link } from "react-router-dom";
// import postImg from "../images/postImg.jpeg";

const API_URL = "https://blog-application-inkwrite.onrender.com";

const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden xl:block xl:w-1/3">
      
        <img
          src={post.imageName ? `${API_URL}/api/posts/image/${post.imageName}` : 
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="currentColor" viewBox="0 0 24 24" ></svg>
        }
          alt={post.title}
          className="rounded-2xl object-cover w-full h-[220px]"
          width="735"
        />
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