import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate,Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";



const AdminLayout = () => {
const { user, logout } = useAuth();
const location = useLocation();
const navigate = useNavigate();
const [sidebarOpen, setSidebarOpen] = useState(true);
console.log("AdminLayout user:", user);
console.log("AdminLayout isAdmin:",  user?.roles);
const isAdmin = user?.roles?.some(r => r.name === "ROLE_ADMIN");

console.log("AdminLayout isAdmin:", isAdmin);
if (!user) return <Navigate to="/login" />;
if (!isAdmin) return <Navigate to="/" />;

const handleLogout = () => {
  logout();
  navigate("/");
  };

const navItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
       <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
      ),
    },
    {
      label: "Posts",
      path: "/admin/posts",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      label: "Categories",
      path: "/admin/categories",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      label: "Create Post",
      path: "/admin/posts/create",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
  ];

const isActive = (path) =>
  path === "/admin"? location.pathname === "/admin" : location.pathname.startsWith(path);

return (
  <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="flex min-h-screen bg-[#F7F5F2]">
    <aside className="flex flex-col bg-[#1A1A1A] w-[220px] ..."> 
      <div className="flex items-center gap-2 px-4 py-4 border-b border-white/10">
        <div className="w-7 h-7 bg-[#B4500A] rounded-md flex items-center justify-center shrink-0">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L5 3L8 9L10 6L12 12" stroke="#E8E6E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>  
      </div>
      
      <nav className="flex flex-col gap-1 p-2 flex-1 mt-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all duration-150 
              ${ isActive(item.path) ? "bg-[#B4500A] text-[#E8E6E0]" : "text-white/60 hover:bg-white/10 hover:text-[#E8E6E0]" }`}
            
            >
            <span className="shrink-0">{item.icon}</span>
            {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
      </nav>
      
      <div className="p-3 border-t border-white/10 flex flex-col gap-2">
        {sidebarOpen && user && (
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-7 h-7 rounded-full bg-[#B4500A]/30 flex items-center justify-center text-[11px] font-medium text-[#E8E6E0] shrink-0">
                {user.name?.split(" ").map((p) => p[0]).join("").toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-medium text-[#E8E6E0] truncate">{user.name}</span>
                <span className="text-[10px] text-white/40 truncate">{user.email}</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
             {sidebarOpen && (
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-white/60 hover:bg-white/10 hover:text-[#E8E6E0] transition ${sidebarOpen ? "flex-1" : "w-full justify-center"}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              {sidebarOpen && "Log out"}
               Log out
            </button>
             )}
             <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="p-2 rounded-lg text-white/40 hover:bg-white/10 hover:text-[#E8E6E0] transition"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  </div>
</div>
      </aside>

      <main className="flex-1 min-w-0 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;