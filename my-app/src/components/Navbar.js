import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function getInitials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const navLinks = ["Home", "Trending", "Most Popular", "About"];

  return (
    <nav
  style={{ fontFamily: "'DM Sans', sans-serif" }}
  className="w-full max-w-none bg-white border-b border-gray-100 h-[60px] px-6 md:px-8 flex items-center justify-between sticky top-0 z-50"
>
  <Link to="/" className="flex items-center gap-2 group">
    <div className="w-7 h-7 bg-[#2C2C2A] rounded-md flex items-center justify-center">
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M2 12L5 3L8 9L10 6L12 12"
              stroke="#E8E6E0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span style={{ fontFamily: "'Lora', serif", letterSpacing: "-0.3px" }}
          className="text-[17px] font-medium text-gray-900">Ink
          <span className="text-[#B4500A]">Write</span>
        </span>
      </Link>

     
      <div className="hidden md:flex items-center gap-0.5 flex-nowrap">
        {navLinks.map((item) => ( 
          <Link key={item} to="/"  className="text-[13.5px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-3 py-1.5 rounded-md transition-all duration-150 whitespace-nowrap"  >{item}
          </Link>
        ))}
      </div>
    
      <div className="hidden md:flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">

            <div className="w-[30px] h-[30px] rounded-full bg-amber-200 flex items-center justify-center text-[12px] font-medium text-amber-900">
              {getInitials(user.name)}
            </div>
            <span className="text-[13.5px] font-medium text-gray-800">
              {user.name.split(" ")[0]}
            </span>
            <div className="w-px h-[18px] bg-gray-200 mx-1" />
            <button
              onClick={handleLogout}
              className="text-[13px] text-gray-500 hover:text-gray-900 px-1.5 py-1 rounded transition-colors duration-150"
            >
              Log out
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="text-[13px] font-medium text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-3.5 py-1.5 rounded-md transition-all duration-150">
                Log in
              </button>
            </Link>
            <Link to="/register">
              <button className="text-[13px] font-medium text-white bg-[#2C2C2A] hover:bg-[#444441] px-3.5 py-1.5 rounded-md transition-all duration-150">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>

  
      <button
        className="md:hidden p-1.5 rounded-md hover:bg-gray-50 transition"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? (
          <HiX className="text-xl text-gray-600" />
        ) : (
          <HiMenu className="text-xl text-gray-600" />
        )}
      </button>


      <div
        className={`md:hidden fixed top-[60px] left-0 w-full bg-white border-t border-gray-100 flex flex-col px-6 py-5 gap-1 z-40 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {navLinks.map((item) => (
          <Link
            key={item}
            to="/"
            onClick={() => setOpen(false)}
            className="text-[13.5px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-md transition-all duration-150"
          >
            {item}
          </Link>
        ))}

        <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
          {user ? (
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center text-[11px] font-medium text-amber-900">
                  {getInitials(user.name)}
                </div>
                <span className="text-[13.5px] font-medium text-gray-800">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-[13px] text-gray-500 hover:text-gray-900 px-2 py-1 rounded transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="w-full py-2 text-[13px] font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition">
                  Log in
                </button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <button className="w-full py-2 text-[13px] font-medium text-white bg-[#2C2C2A] hover:bg-[#444441] rounded-md transition">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;