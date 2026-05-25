import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../utils/AuthContext";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const r = await axiosInstance.get("/api/users/");
      setUsers(r.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (userId) => {
    if (userId === currentUser?.id) {
      alert("You cannot delete your own account.");
      return;
    }
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    setDeletingId(userId);
    try {
      await axiosInstance.delete(`/api/users/${userId}`);
      fetchUsers();
    } catch {
      alert("Failed to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const getInitials = (name) =>
    name?.split(" ").map((p) => p[0]).join("").toUpperCase() || "?";

  const isAdmin = (user) =>
    user.roles?.some((r) => r.name === "ROLE_ADMIN");

  return (
    <div className="flex flex-col gap-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: "'Lora', serif" }} className="text-[26px] font-medium text-[#2C2C2A]">
            Users
          </h1>
          <p className="text-[13px] text-gray-400 mt-1">{users.length} registered users</p>
        </div>
      </div>

      <div className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#B4500A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <p className="text-[13px] text-gray-400 px-6 py-10 text-center">No users found.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E6E0] bg-[#F7F5F2]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">User</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden md:table-cell">Email</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden lg:table-cell">About</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Role</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7F5F2]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F5F2] transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8E6E0] flex items-center justify-center text-[11px] font-medium text-[#2C2C2A] shrink-0">
                        {getInitials(u.name)}
                      </div>
                      <div>
                        <p className="font-medium text-[#2C2C2A]">{u.name}</p>
                        <p className="text-[11px] text-gray-400">ID: {u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{u.email}</td>
                  <td className="px-5 py-3.5 text-gray-400 hidden lg:table-cell max-w-[200px]">
                    <span className="line-clamp-1">{u.about || "—"}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    {isAdmin(u) ? (
                      <span className="bg-[#B4500A]/10 text-[#B4500A] text-[11px] font-medium px-2.5 py-1 rounded-full">
                        Admin
                      </span>
                    ) : (
                      <span className="bg-[#E8E6E0] text-[#444441] text-[11px] font-medium px-2.5 py-1 rounded-full">
                        User
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/users/${u.id}/posts`}
                        className="text-[12px] text-[#B4500A] hover:underline"
                      >
                        Posts
                      </Link>
                      <span className="text-gray-200">|</span>
                      <button
                        onClick={() => handleDelete(u.id)}
                        disabled={deletingId === u.id || u.id === currentUser?.id}
                        className="text-[12px] text-gray-400 hover:text-red-500 transition disabled:opacity-30"
                      >
                        {deletingId === u.id ? "..." : "Delete"}
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

export default AdminUsers;