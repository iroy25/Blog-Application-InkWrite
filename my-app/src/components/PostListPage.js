import { useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import MainCategories from "../components/MainCategories";

const PostListPage = () => {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat");

  return (
    <div className="mt-6 flex flex-col gap-8">
      <MainCategories />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {cat ? `Category: ${cat}` : "All Posts"}
        </h2>

        <PostList />
        
      </div>
    </div>
  );
};

export default PostListPage;