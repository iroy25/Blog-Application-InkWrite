import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const PostMenuActions = ({ post }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [deleting, setDeleting] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [message, setMessage] = useState("");

  const isAuthor = user && post && (
    user.name === post.author_name ||
    user.roles?.some(r => r.name === "ROLE_ADMIN")
  );

  if (!isAuthor) return null;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      setDeleting(true);
      await axiosInstance.delete(`/api/posts/${post.postId}`);
      navigate("/posts");
    } catch (err) {
      setMessage("Failed to delete post.");
    } finally {
      setDeleting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploadingImg(true);
      await axiosInstance.post(
        `/api/posts/image/upload/${post.postId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Image uploaded!");
      window.location.reload();
    } catch (err) {
      setMessage("Failed to upload image.");
    } finally {
      setUploadingImg(false);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="mb-4 text-sm font-medium">Actions</h1>

      {message && (
        <p className="text-xs mb-3 text-blue-600">{message}</p>
      )}

      {/* Edit → navigate to WritePage */}
      <div
        onClick={() => navigate(`/edit-post/${post.postId}`)}
        className="flex items-center gap-2 py-2 text-sm cursor-pointer hover:text-blue-600 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        <span>Edit this post</span>
      </div>

      <div
        onClick={() => fileInputRef.current.click()}
        className="flex items-center gap-2 py-2 text-sm cursor-pointer hover:text-blue-600 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span>{uploadingImg ? "Uploading..." : "Upload image"}</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

     
      <div
        onClick={handleDelete}
        className="flex items-center gap-2 py-2 text-sm cursor-pointer hover:text-red-600 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
        <span>{deleting ? "Deleting..." : "Delete this post"}</span>
      </div>
    </div>
  );
};

export default PostMenuActions;