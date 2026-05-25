import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const StatCard = ({ label, value, icon, accent }) => (
  <div className="bg-white border border-[#E8E6E0] rounded-2xl p-5 flex items-center gap-4">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-[12px] text-gray-400 mb-0.5">{label}</p>
      <p className="text-[22px] font-medium text-[#2C2C2A]">{value ?? "—"}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);
  const [categories, setCategories] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/posts?pageSize=5&sortBy=addedDate&sortDir=desc")
      .then((r) => {
        setPosts(r.data.totalElements);
        setRecentPosts(r.data.content || []);
      }).catch(() => {});

    axiosInstance.get("/api/users/")
      .then((r) => setUsers(r.data.length))
      .catch(() => {});

    axiosInstance.get("/api/categories/")
      .then((r) => setCategories(r.data.length))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col gap-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div>
        <h1 style={{ fontFamily: "'Lora', serif" }} className="text-[26px] font-medium text-[#2C2C2A]">
          Dashboard
        </h1>
        <p className="text-[13px] text-gray-400 mt-1">Welcome back. Here's what's going on.</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Posts"
          value={posts}
          accent="bg-[#B4500A]/10"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B4500A" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          }
        />
        <StatCard
          label="Total Users"
          value={users}
          accent="bg-[#D4622A]/10"  
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4622A" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          }
        />
        <StatCard
          label="Categories"
          value={categories}
          accent="bg-[#E8891A]/10"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8891A" strokeWidth="1.5">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
          }
        />
      </div>

      <div className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E6E0]">
          <h2 style={{ fontFamily: "'Lora', serif" }} className="text-[16px] font-medium text-[#2C2C2A]">
            Recent Posts
          </h2>
          <Link to="/admin/posts" className="text-[12px] text-[#B4500A] hover:underline">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-[#F7F5F2]">
          {recentPosts.length === 0 ? (
            <p className="text-[13px] text-gray-400 px-6 py-5">No posts yet.</p>
          ) : (
            recentPosts.map((post) => (
              <div key={post.postId} className="flex items-center justify-between px-6 py-3.5 hover:bg-[#F7F5F2] transition">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[13.5px] font-medium text-[#2C2C2A] truncate">{post.title}</span>
                  <span className="text-[11px] text-gray-400">
                    {post.author_name} · {post.category?.categoryTitle} · {new Date(post.addedDate).toLocaleDateString()}
                  </span>
                </div>
                <Link
                  to={`/admin/posts/edit/${post.postId}`}
                  className="text-[12px] text-[#B4500A] hover:underline ml-4 shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;