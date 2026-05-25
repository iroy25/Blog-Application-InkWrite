import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const MainCategories = () => {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/api/categories/")
      .then((r) => setCategories(r.data))
      .catch(() => {});
  }, []);

  
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/posts/search/${query.trim()}`);
        setResults(res.data);
        setOpen(true);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (postId) => {
    setOpen(false);
    setQuery("");
    navigate(`/post/${postId}`);
  };

  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 border border-[#E8E6E0] items-center justify-between gap-4">

      <div className="flex items-center gap-2 flex-wrap">
        <Link
          to="/posts"
          className="bg-[#2C2C2A] text-[#E8E6E0] rounded-full px-4 py-2 transition-all duration-200 whitespace-nowrap text-sm"
        >
          All Posts
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.categoryId}
            to={`/posts?cat=${cat.categoryId}`}
            className="text-[#2C2C2A] hover:bg-[#F7F5F2] rounded-full px-4 py-2 transition-all duration-200 whitespace-nowrap text-sm"
          >
            {cat.categoryTitle}
          </Link>
        ))}
      </div>

      <span className="text-gray-300 flex-shrink-0">|</span>

      
      <div ref={searchRef} className="relative flex-shrink-0">
        <div className="bg-[#F7F5F2] border border-[#E8E6E0] rounded-full flex items-center gap-1 px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#B4500A">
            <circle cx="10.5" cy="10.5" r="7.5" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search a post..."
            className="bg-transparent outline-none text-sm w-32 text-[#2C2C2A] placeholder-gray-400"
          />
          {loading && (
            <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        
        {open && (
          <div className="absolute top-10 right-0 w-72 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
            {results.length === 0 ? (
              <p className="text-sm text-gray-400 px-4 py-3">No posts found.</p>
            ) : (
              results.map((post) => (
                <div
                  key={post.postId}
                  onClick={() => handleSelect(post.postId)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                >
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    {post.content}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default MainCategories;