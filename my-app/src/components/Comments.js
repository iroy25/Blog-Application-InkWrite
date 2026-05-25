import { useState, useEffect } from "react";
import Comment from "../components/Comment";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../utils/AuthContext";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteComment = (commentId) => {
  setComments((prev) => prev.filter(c => c.commentId !== commentId));
};

  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/api/posts/${postId}`);
        setComments(res.data.comments || []);
      } catch (err) {
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };
    if (postId) fetchComments();
  }, [postId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    if (!user) {
      alert("Please login to comment.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await axiosInstance.post(
        `/api/users/${userId}/post/${postId}/comments`,
        { content: newComment }
      );
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      alert("Failed to post comment. Are you logged in?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    
    <div
      className="flex flex-col gap-6 lg:w-3/5"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <h2
        className="text-[18px] font-medium text-[#2C2C2A]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Comments{" "}
        <span className="text-gray-400 font-normal text-[15px]">
          ({comments.length})
        </span>
      </h2>

      <div className="flex items-start gap-3 w-full">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user ? "Write a comment..." : "Login to comment"}
          className="w-full p-4 rounded-xl border border-[#E8E6E0] bg-[#F7F5F2] text-[13.5px] text-[#2C2C2A] placeholder-gray-400 outline-none focus:border-[#B4500A] focus:bg-white transition resize-none"
          rows={3}
          disabled={!user}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        <button
          onClick={handleSubmit}
          disabled={submitting || !user}
          className="bg-[#2C2C2A] hover:bg-[#444441] px-4 py-3 text-[#E8E6E0] text-[13px] font-medium rounded-xl disabled:opacity-50 transition whitespace-nowrap"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {submitting ? "Sending..." : "Send"}
        </button>
        
      </div>

      {loading ? (
        <p className="text-[13px] text-gray-400">Loading comments...</p>
      ) : error ? (
        <p className="text-[13px] text-red-500">{error}</p>
      ) : comments.length === 0 ? (
        <p className="text-[13px] text-gray-400">No comments yet. Be the first!</p>
      ) : (
        comments.map((comment, i) => (
      <Comment
        key={comment.commentId || i}
        comment={comment}
        
        onDelete={handleDeleteComment}
      />
    ))
    
      )}
    </div>
  );
};

export default Comments; 