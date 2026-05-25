import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import PostListItem from "./PostListItem";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat"); 

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let res;
        if (cat) {
          
          res = await axiosInstance.get(`/api/category/${cat}/posts`);
          setPosts(res.data); 
        } else {
          
          res = await axiosInstance.get("/api/posts");
          setPosts(res.data.content); 
        }
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [cat]); 

  if (loading) return <div className="text-center py-10">Loading posts...</div>;
  if (posts.length === 0) return <div className="text-center py-10">No posts found.</div>;

  return (
    <div className="flex flex-col gap-12 mb-8">
      {posts.map((post) => (
        <PostListItem key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default PostList;