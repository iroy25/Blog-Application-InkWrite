import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AdminUserPosts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsRes, userRes] = await Promise.all([
        axiosInstance.get(`/api/user/${userId}/posts`),
        axiosInstance.get(`/api/users/${userId}`),
      ]);
      setPosts(postsRes.data);
      setUserName(userRes.data.name);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [userId]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;
    setDeletingId(postId);
    try {
      await axiosInstance.delete(`/api/posts/${postId}`);
      fetchData();
    } catch {
      alert("Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex items-center gap-3">
        <Link to="/admin/users" className="text-[13px] text-gray-400 hover:text-[#2C2C2A] transition">
          ← Users
        </Link>
        <span className="text-gray-300">/</span>
        <h1 style={{ fontFamily: "'Lora', serif" }} className="text-[22px] font-medium text-[#2C2C2A]">
          {userName ? `${userName}'s Posts` : `User #${userId} Posts`}
        </h1>
      </div>

      <div className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#B4500A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-[13px] text-gray-400 px-6 py-10 text-center">This user has no posts.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E6E0] bg-[#F7F5F2]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Title</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden md:table-cell">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7F5F2]">
              {posts.map((post) => (
                <tr key={post.postId} className="hover:bg-[#F7F5F2] transition">
                  <td className="px-5 py-3.5 font-medium text-[#2C2C2A]">{post.title}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    {post.category ? (
                      <span className="bg-[#E8E6E0] text-[#2C2C2A] text-[11px] font-medium px-2.5 py-1 rounded-full">
                        {post.category.categoryTitle}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 hidden md:table-cell">
                    {new Date(post.addedDate).toLocaleDateString()}
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
      </div>
    </div>
  );
};

export default AdminUserPosts;