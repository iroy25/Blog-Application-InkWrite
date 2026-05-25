import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../utils/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const res = await axiosInstance.post("/api/v1/auth/login", {
      email: username,
      password,
    });
    const token = res.data.token;
    localStorage.setItem("token", token);
    console.log("login response:", res.data);

const userRes = await axiosInstance.get("/api/v1/auth/current-user");
console.log("current user response:", userRes.data);
console.log("role check:", userRes.data.role);
console.log("roles check:", userRes.data.roles);
console.log("authorities check:", userRes.data.authorities);

login(userRes.data, token);

const isAdmin = userRes.data.roles?.some(r => r.name === "ROLE_ADMIN");
console.log("isAdmin:", isAdmin);
console.log("roles:", userRes.data.roles);

if (isAdmin) {
  navigate("/admin");
} else {
  navigate("/");
}
  } catch (err) {
    console.log("FULL ERROR:", err.response);
    setError("Invalid email or password. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] px-4" style={{ background: "#F7F5F2", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="w-full max-w-[400px] bg-white border border-[#E8E6E0] rounded-2xl px-8 py-9 shadow-sm">

        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-7">
          <div className="w-[26px] h-[26px] bg-[#2C2C2A] rounded-[5px] flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L5 3L8 9L10 6L12 12" stroke="#E8E6E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Lora', serif" }} className="text-[16px] font-medium text-[#2C2C2A]">
            Ink<span className="text-[#B4500A]">Write</span>
          </span>
        </div>

        <h2
          style={{ fontFamily: "'Lora', serif" }}
          className="text-[22px] font-medium text-[#2C2C2A] text-center mb-1"
        >
          Welcome back
        </h2>
        <p className="text-[13px] text-gray-400 text-center mb-6">
          Sign in to continue writing
        </p>

  
        <div className="grid grid-cols-3 gap-2 mb-5">
          <button className="flex items-center justify-center gap-1.5 py-2 border border-[#E8E6E0] rounded-lg text-[12.5px] text-gray-500 hover:bg-[#F7F5F2] hover:border-[#d0cdc7] hover:text-[#2C2C2A] transition">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>

          <button className="flex items-center justify-center gap-1.5 py-2 border border-[#E8E6E0] rounded-lg text-[12.5px] text-gray-500 hover:bg-[#F7F5F2] hover:border-[#d0cdc7] hover:text-[#2C2C2A] transition">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>

          <button className="flex items-center justify-center gap-1.5 py-2 border border-[#E8E6E0] rounded-lg text-[12.5px] text-gray-500 hover:bg-[#F7F5F2] hover:border-[#d0cdc7] hover:text-[#2C2C2A] transition">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

       
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#E8E6E0]" />
          <span className="text-[12px] text-gray-400">or continue with email</span>
          <div className="flex-1 h-px bg-[#E8E6E0]" />
        </div>

        
        {error && (
          <div className="mb-4 text-[12.5px] text-red-600 bg-red-50 border border-red-100 rounded-lg py-2 px-3 text-center">
            {error}
          </div>
        )}

        
  <form onSubmit={handleLogin} className="flex flex-col gap-3">
  <div className="relative">
    <input
      type="email"
      placeholder="Email address"
      required
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full h-[42px] bg-[#F7F5F2] border border-[#E8E6E0] rounded-lg pl-4 pr-10 text-[13.5px] text-[#2C2C2A] placeholder-gray-400 outline-none focus:border-[#B4500A] focus:bg-white transition"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    </span>
  </div>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full h-[42px] bg-[#F7F5F2] border border-[#E8E6E0] rounded-lg pl-4 pr-10 text-[13.5px] text-[#2C2C2A] placeholder-gray-400 outline-none focus:border-[#B4500A] focus:bg-white transition"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    />
    
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2C2C2A] transition"
    >
      {showPassword ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  </div>


  <button
    type="submit"
    disabled={loading}
    className="w-full h-[42px] bg-[#2C2C2A] hover:bg-[#444441] text-[#E8E6E0] text-[13.5px] font-medium rounded-lg transition disabled:opacity-50 mt-1"
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    {loading ? "Signing in..." : "Sign in"}
  </button>
</form>

        <p className="text-[12.5px] text-gray-400 text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-[#B4500A] font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;