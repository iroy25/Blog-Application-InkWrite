import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../utils/AuthContext";

const AdminPostForm = () => {
  const { postId } = useParams();
  const isEdit = Boolean(postId);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({ title: "", content: "", imageName: "" });
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance.get("/api/categories/")
      .then((r) => setCategories(r.data))
      .catch(() => {});

    if (isEdit) {
      setFetching(true);
      axiosInstance.get(`/api/posts/${postId}`)
        .then((r) => {
          setForm({
            title: r.data.title || "",
            content: r.data.content || "",
            imageName: r.data.imageName || "",
          });
          setCategoryId(r.data.category?.categoryId || "");
        })
        .catch(() => setError("Failed to load post."))
        .finally(() => setFetching(false));
    }
  }, [postId, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isEdit) {
        await axiosInstance.put(`/api/posts/${postId}`, { ...form, category: { categoryId } });
      } else {
        await axiosInstance.post(
          `/api/user/${user.id}/category/${categoryId}/posts`,
          form
        );
      }
      navigate("/admin/posts");
    } catch {
      setError("Failed to save post. Check all fields.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-[42px] bg-[#F7F5F2] border border-[#E8E6E0] rounded-lg px-4 text-[13.5px] text-[#2C2C2A] placeholder-gray-400 outline-none focus:border-[#B4500A] focus:bg-white transition";

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-[#B4500A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div>
        <h1 style={{ fontFamily: "'Lora', serif" }} className="text-[26px] font-medium text-[#2C2C2A]">
          {isEdit ? "Edit Post" : "Create Post"}
        </h1>
        <p className="text-[13px] text-gray-400 mt-1">
          {isEdit ? `Editing post #${postId}` : "Write a new post"}
        </p>
      </div>

      <div className="bg-white border border-[#E8E6E0] rounded-2xl p-6">
        {error && (
          <div className="mb-5 text-[12.5px] text-red-600 bg-red-50 border border-red-100 rounded-lg py-2 px-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">Title</label>
            <input
              type="text"
              placeholder="Post title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">Category</label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={inputClass}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">Content</label>
            <textarea
              placeholder="Write your post content..."
              required
              rows={10}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full bg-[#F7F5F2] border border-[#E8E6E0] rounded-lg px-4 py-3 text-[13.5px] text-[#2C2C2A] placeholder-gray-400 outline-none focus:border-[#B4500A] focus:bg-white transition resize-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">Image Name</label>
            <input
              type="text"
              placeholder="e.g. default.png"
              value={form.imageName}
              onChange={(e) => setForm({ ...form, imageName: e.target.value })}
              className={inputClass}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2C2C2A] hover:bg-[#444441] text-[#E8E6E0] text-[13.5px] font-medium px-6 py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/posts")}
              className="text-[13px] text-gray-400 hover:text-[#2C2C2A] px-4 py-2.5 rounded-lg border border-[#E8E6E0] hover:bg-[#F7F5F2] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPostForm;