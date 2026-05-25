import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const PAGE_SIZE = 10;

  const fetchPosts = async (pageNum = 0) => {
    setLoading(true);
    try {
      const r = await axiosInstance.get(
        `/api/posts?pageNumber=${pageNum}&pageSize=${PAGE_SIZE}&sortBy=postId&sortDir=desc`
      );
      setPosts(r.data.content || []);
      setTotalPages(r.data.totalPages);
      setTotalElements(r.data.totalElements);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(page); }, [page]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(postId);
    try {
      await axiosInstance.delete(`/api/posts/${postId}`);
      fetchPosts(page);
    } catch {
      alert("Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: "'Lora', serif" }} className="text-[26px] font-medium text-[#2C2C2A]">
            Posts
          </h1>
          <p className="text-[13px] text-gray-400 mt-1">{totalElements} total posts</p>
        </div>
        <Link
          to="/admin/posts/create"
          className="flex items-center gap-2 bg-[#2C2C2A] hover:bg-[#444441] text-[#E8E6E0] text-[13px] font-medium px-4 py-2.5 rounded-lg transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Post
        </Link>
      </div>

      <div className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#B4500A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-[13px] text-gray-400 px-6 py-10 text-center">No posts found.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E6E0] bg-[#F7F5F2]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Title</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden md:table-cell">Author</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden lg:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden lg:table-cell">Date</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden md:table-cell">Comments</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7F5F2]">
              {posts.map((post) => (
                <tr key={post.postId} className="hover:bg-[#F7F5F2] transition">
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-[#2C2C2A] line-clamp-1">{post.title}</span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{post.author_name || "—"}</td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    {post.category ? (
                      <span className="bg-[#E8E6E0] text-[#2C2C2A] text-[11px] font-medium px-2.5 py-1 rounded-full">
                        {post.category.categoryTitle}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 hidden lg:table-cell whitespace-nowrap">
                    {new Date(post.addedDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 hidden md:table-cell">
                    {post.comments?.length ?? 0}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/posts/edit/${post.postId}`}
                        className="text-[12px] text-[#B4500A] hover:underline"
                      >
                        Edit
                      </Link>
                      <span className="text-gray-200">|</span>
                      <button
                        onClick={() => handleDelete(post.postId)}
                        disabled={deletingId === post.postId}
                        className="text-[12px] text-gray-400 hover:text-red-500 transition disabled:opacity-40"
                      >
                        {deletingId === post.postId ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#E8E6E0]">
            <span className="text-[12px] text-gray-400">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 text-[12px] border border-[#E8E6E0] rounded-lg hover:bg-[#F7F5F2] disabled:opacity-40 transition"
              >
                ← Prev
              </button>
              <button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 text-[12px] border border-[#E8E6E0] rounded-lg hover:bg-[#F7F5F2] disabled:opacity-40 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPosts;