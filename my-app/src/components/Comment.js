
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const Comment = ({ comment, onDelete }) => {
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const formattedDate = new Date(comment.addedDate || Date.now())
    .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const canDelete = user && (
    user.name === comment.userName ||
    user.roles?.some(r => r.name === "ROLE_ADMIN")
  );
  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      setDeleting(true);
      await axiosInstance.delete(`/api/comments/${comment.id}`);
      onDelete(comment.id);
      
    } catch (err) {
      alert("Failed to delete comment.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-4">
      <div className="flex items-center gap-4">


        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="currentColor" viewBox="0 0 24 24" >

<path d="M12 6c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4m0 6c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2"></path><path d="M12 2C6.49 2 2 6.49 2 12c0 3.26 1.58 6.16 4 7.98V20h.03c1.67 1.25 3.73 2 5.97 2s4.31-.75 5.97-2H18v-.02c2.42-1.83 4-4.72 4-7.98 0-5.51-4.49-10-10-10M8.18 19.02C8.59 17.85 9.69 17 11 17h2c1.31 0 2.42.85 2.82 2.02-1.14.62-2.44.98-3.82.98s-2.69-.35-3.82-.98m9.3-1.21c-.81-1.66-2.51-2.82-4.48-2.82h-2c-1.97 0-3.66 1.16-4.48 2.82A7.96 7.96 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.97 4.36-2.52 5.82"></path>
</svg>
        <span className="font-medium">
          {comment.userName || "Anonymous"}
        </span>
        <span className="text-sm text-gray-500">{formattedDate}</span>

        
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="ml-auto text-gray-400 hover:text-red-500 transition disabled:opacity-50"
            title="Delete comment"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        )}
      </div>
      <div className="mt-4">
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;