import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Comments from "../components/Comments"; 
import PostMenuActions from "./PostMenuActions";
import { useAuth } from "../utils/AuthContext";

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        setError("Failed to load post.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const { user } = useAuth();

  if (loading) return (
    
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 mt-10">{error}</div>
  );

  if (!post) return null;

  const formattedDate = new Date(post.addedDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

 return (
  <div className="max-w-6xl mx-auto mt-8 px-4 pb-16 flex gap-8">
    
    
    <div className="flex-1 max-w-3xl">
      
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        ← Back to Posts
      </button>

      {post.category && (
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {post.category.categoryTitle}
        </span>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-snug">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
          {post.author_name?.charAt(0).toUpperCase() || "U"}
        </div>
        <span>
          By <span className="font-medium text-gray-700">{post.author_name}</span>
        </span>
        <span>•</span>
        <span>{formattedDate}</span>
      </div>

  {post.imageName && (
  <div className="mb-8 rounded-xl overflow-hidden shadow-md">
      <img
        src={post.imageName}
        alt={post.title}
        className="w-full object-cover max-h-[500px]"
        onError={(e) => { e.target.style.display = "none"; }}
      />
    </div>
  )}

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>

      <div className="mt-12 border-t pt-8">
        <Comments postId={postId} />
      </div>
    </div>

   
    {user && (user.name === post.author_name || user.roles?.some(r => r.name === "ROLE_ADMIN")) && (
  <div className="hidden lg:block w-64 shrink-0">
    <div className="sticky top-[80px] border border-gray-100 rounded-2xl p-5 shadow-sm bg-white">
      <PostMenuActions post={post} />
    </div>

    
  </div>
)}

     {user && (user.name === post.author_name || user.roles?.some(r => r.name === "ROLE_ADMIN")) && (
  <div className="block lg:hidden mt-6">
    <div className="border border-gray-100 rounded-2xl p-5 shadow-sm bg-white">
      <PostMenuActions post={post} />
    </div>
  </div>
)}


  </div>
);


};

export default SinglePostPage;