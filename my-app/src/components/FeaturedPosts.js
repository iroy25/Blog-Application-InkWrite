import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/posts?pageSize=4&sortBy=addedDate&sortDir=desc")
      .then((res) => setPosts(res.data.content || []))
      .catch((err) => console.error("Failed to fetch posts", err));
  }, []);

  const [featured] = posts; 

  return (
    <div className="flex flex-col gap-8">

    
      <div className="flex flex-col gap-4">
        {featured ? (
          <>
            
            <div className="relative overflow-hidden rounded-2xl group">
              {featured.imageName && featured.imageName !== "default.jpg" ? (
                <img
                  src={`http://localhost:9095/api/posts/image/${featured.imageName}`}
                  alt={featured.title}
                  className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <div className="w-full aspect-video bg-[#F7F5F2] rounded-2xl border border-[#E8E6E0]" />
              )}
              {featured.category && (
                <span className="absolute top-3 left-3 bg-[#2C2C2A]/80 text-[#E8E6E0] text-xs font-medium px-3 py-1 rounded-full">
                  {featured.category.categoryTitle}
                </span>
              )}
            </div>

            
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="font-semibold text-[#2C2C2A]">01.</span>
              <span>•</span>
              <span>{new Date(featured.addedDate).toLocaleDateString()}</span>
              <span>•</span>
              <span className="text-[#B4500A]">{featured.author_name}</span>
            </div>

           
            <Link
              to={`/post/${featured.postId}`}
              style={{ fontFamily: "'Lora', serif" }}
              className="text-2xl lg:text-3xl font-medium text-[#2C2C2A] leading-snug hover:text-[#B4500A] transition-colors"
            >
              {featured.title}
            </Link>

            
            <p className="text-[#444441] text-[14px] leading-relaxed">
              {featured.content?.length > 100
                ? featured.content.slice(0, 100)
                : featured.content}
              {featured.content?.length > 100 && (
                <>
                  {"... "}
                  <Link
                    to={`/post/${featured.postId}`}
                    className="text-[#B4500A] font-medium hover:underline"
                  >
                    Read more
                  </Link>
                </>
              )}
            </p>
          </>
        ) : (
          <div className="w-full aspect-video bg-[#F7F5F2] rounded-2xl border border-[#E8E6E0] animate-pulse" />
        )}
      </div>

    </div>
  );
};

export default FeaturedPosts;