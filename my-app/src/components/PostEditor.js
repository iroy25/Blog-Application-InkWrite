import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const PostEditor = ({ isAdmin = false }) => {
  const { postId } = useParams(); 
  const isEditMode = !!postId;
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  
  useEffect(() => {
    axiosInstance.get("/api/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  
  useEffect(() => {
    if (isEditMode) {
      axiosInstance.get(`/api/posts/${postId}`)
        .then(res => {
          const post = res.data;
          setTitle(post.title || "");
          setContent(post.content || "");
          setCategoryId(post.category?.categoryId || "");
          if (post.imageName && post.imageName !== "default.jpg") {
            setImagePreview(`https://blog-application-inkwrite.onrender.com/api/posts/image/${post.imageName}`);
          }
        })
        .catch(err => console.error("Failed to fetch post", err));
    }
  }, [postId, isEditMode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !categoryId) {
      setMessage("Please fill in all fields.");
      return;
    }
    try {
      setSubmitting(true);
      let savedPostId = postId;

      if (isEditMode) {
        
        await axiosInstance.put(`/api/posts/${postId}`, {
          title,
          content,
          imageName: "default.jpg",
        });
      } else {

        const res = await axiosInstance.post(
          `/api/user/${user.id}/category/${categoryId}/posts`,
          { title, content, imageName: "default.jpg" }
        );
        savedPostId = res.data.postId;
      }


      if (imageFile && savedPostId) {
        const formData = new FormData();
        formData.append("image", imageFile);
        await axiosInstance.post(
          `/api/posts/image/upload/${savedPostId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      if (isAdmin) {
    navigate("/admin/posts");
    } else {
        navigate(`/post/${savedPostId}`);
    }
    } catch (err) {
      console.error(err);
      setMessage("Failed to save post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="max-w-3xl mx-auto mt-10 px-4 pb-20"
    >

      <div className="flex items-center justify-between mb-8">
        <h1
          style={{ fontFamily: "'Lora', serif" }}
          className="text-2xl font-semibold text-gray-900"
        >
          {isEditMode ? "Edit Post" : "Write a New Post"}
        </h1>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-[#2C2C2A] hover:bg-[#444441] text-white text-sm font-medium px-5 py-2 rounded-lg transition disabled:opacity-50"
        >
          {submitting ? "Publishing..." : isEditMode ? "Update" : "Publish"}
        </button>
      </div>

      {message && (
        <div className="mb-5 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          {message}
        </div>
      )}

 
      <input
        type="text"
        placeholder="Post title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ fontFamily: "'Lora', serif" }}
        className="w-full text-3xl font-semibold text-gray-900 placeholder-gray-300 outline-none border-none mb-6 bg-transparent"
      />

      <div className="w-full h-px bg-gray-100 mb-6" />


      <div className="mb-6">
        <label className="text-xs font-medium text-gray-500 mb-2 block uppercase tracking-wide">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400 transition bg-white"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryTitle}
            </option>
          ))}
        </select>
      </div>


      <div className="mb-6">
        <label className="text-xs font-medium text-gray-500 mb-2 block uppercase tracking-wide">
          Cover Image
        </label>
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden mb-2">
            <img
              src={imagePreview}
              alt="preview"
              className="w-full max-h-64 object-cover"
            />
            <button
              onClick={() => { setImageFile(null); setImagePreview(null); }}
              className="absolute top-2 right-2 bg-white text-gray-700 text-xs px-3 py-1 rounded-full shadow hover:bg-gray-100 transition"
            >
              Remove
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-10 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p className="text-sm text-gray-400 mt-2">Click to upload cover image</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>


      <div className="mb-6">
        <label className="text-xs font-medium text-gray-500 mb-2 block uppercase tracking-wide">
          Content
        </label>
        <textarea
          placeholder="Tell your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-gray-800 leading-relaxed outline-none focus:border-gray-400 transition resize-none"
        />
      </div>
    </div>
  );
};

export default PostEditor;