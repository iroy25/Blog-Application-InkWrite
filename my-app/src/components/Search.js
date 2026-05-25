import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

   console.log("Search component rendered!");
   


  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
     console.log("query changed:", query);
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
    <div ref={wrapperRef} className="relative">
      <div className="bg-gray-100 px-3 py-2 rounded-full flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg"
          width="15" height="15"
          fill="none" viewBox="0 0 24 24"
          stroke="gray" strokeWidth="2">
          <circle cx="10.5" cy="10.5" r="7.5" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input
  type="text"
  onChange={(e) => {
    console.log("typed:", e.target.value);
    setQuery(e.target.value);
  }}
  placeholder="Search posts..."
  className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-40"
/>
        {loading && (
          <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {open && (
        <div className="absolute top-10 left-0 w-72 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
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
  );
};

export default Search;