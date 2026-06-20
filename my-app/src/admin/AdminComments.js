import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const r = await axiosInstance.get(`/api/comments`);
      setComments(r.data || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComments(); }, []);

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment? This cannot be undone.")) return;
    setDeletingId(commentId);
    try {
      await axiosInstance.delete(`/api/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      alert("Failed to delete comment.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div>
        <h1 style={{ fontFamily: "'Lora', serif" }} className="text-[26px] font-medium text-[#2C2C2A]">
          Comments
        </h1>
        <p className="text-[13px] text-gray-400 mt-1">{comments.length} total comments</p>
      </div>

      <div className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#B4500A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-[13px] text-gray-400 px-6 py-10 text-center">No comments found.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E6E0] bg-[#F7F5F2]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Comment</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden md:table-cell">Post</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden lg:table-cell">Commented By</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7F5F2]">
              {comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-[#F7F5F2] transition">
                  <td className="px-5 py-3.5">
                    <span className="text-[#2C2C2A] line-clamp-2">{comment.content}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className="font-medium text-[#2C2C2A] line-clamp-1">
                      {comment.postTitle}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">
                    {comment.userName}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(comment.id)}
                        disabled={deletingId === comment.id}
                        className="text-[12px] text-gray-400 hover:text-red-500 transition disabled:opacity-40"
                      >
                        {deletingId === comment.id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminComments;