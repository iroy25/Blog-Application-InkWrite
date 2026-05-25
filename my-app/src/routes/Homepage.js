import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="mt-8 flex flex-col gap-10 px-4 md:px-0"
    >

      <div className="flex items-center gap-2 text-[12px] text-gray-400">
        <Link to="/" className="hover:text-[#2C2C2A] transition">
          Home
        </Link>
        <span className="text-[#E8E6E0]">/</span>
        <span className="text-[#B4500A] font-medium">Blogs & Articles</span>
      </div>


      <div className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-5 max-w-2xl">

          <h1
            style={{ fontFamily: "'Lora', serif", letterSpacing: "-0.5px" }}
            className="text-[#2C2C2A] text-3xl md:text-5xl lg:text-[56px] font-medium leading-[1.15]"
          >
            InkWrite
          </h1>


          <p className="text-[#444441] text-[15px] md:text-base leading-relaxed max-w-xl">
            A modern blogging platform where users can create, publish, and explore engaging articles with a clean and seamless writing experience.
          </p>


          <Link
            to="/write"
            className="md:hidden self-start flex items-center gap-2 bg-[#2C2C2A] hover:bg-[#444441] text-[#E8E6E0] text-[13px] font-medium px-5 py-2.5 rounded-lg transition"
          >
            Write a story
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </Link>
        </div>


        <Link to="/write" className="hidden md:block relative shrink-0">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="animate-spin [animation-duration:50000ms]"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.12em",
              }}
              fill="#B4500A"
            >
              <textPath href="#circlePath" startOffset="0%">
                • Write • your • story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                • Share • your • story •
              </textPath>
            </text>
          </svg>

          {/* center arrow button — charcoal → terracotta on hover */}
          <button className="absolute inset-0 m-auto w-20 h-20 bg-[#2C2C2A] hover:bg-[#B4500A] transition-colors duration-300 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="1.5"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      
      <div className="w-full h-px bg-[#E8E6E0]" />

      <MainCategories />

      
      <FeaturedPosts />

      
      <div className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden pb-2 mb-10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E6E0]">
          <h2
            style={{ fontFamily: "'Lora', serif" }}
            className="text-[16px] font-medium text-[#2C2C2A]"
          >
            Recent Posts
          </h2>
          <Link to="/posts" className="text-[12px] text-[#B4500A] hover:underline">
            View all →
          </Link>
        </div>
        <div className="px-6 pt-4">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Homepage;