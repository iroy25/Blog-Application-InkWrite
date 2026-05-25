import { useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import MainCategories from "../components/MainCategories";

const PostListPage = () => {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat");

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="mt-6 flex flex-col gap-8"
    >
      <MainCategories />

      <div className="flex flex-col gap-4 pb-12">
        <div className="flex items-center justify-between">
          <h2
            style={{ fontFamily: "'Lora', serif" }}
            className="text-[20px] font-medium text-[#2C2C2A] tracking-tight"
          >
            {cat ? `Category: ${cat}` : "All Posts"}
          </h2>
          {cat && (
            <span className="text-[12px] font-medium text-[#B4500A] bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
              {cat}
            </span>
          )}
        </div>

        <div className="w-full h-px bg-[#E8E6E0]" />

        <PostList />
      </div>
    </div>
  );
};

export default PostListPage;