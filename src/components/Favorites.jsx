import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";
export default function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="min-h-screen bg-zinc-800 py-8 text-white">
      <div className="container mx-auto px-4 ">
        <h1 className="text-3xl font-extrabold border-b-2 tracking-wide mb-8">
          <span className="text-cyan-500">Favorite</span> Blogs
        </h1>
        <div className=" mb-6">
          <Link
            to="/"
            className="bg-zinc-700 absolute top-5 right-5 font-bold text-white px-16 py-2 rounded-lg shadow-md hover:bg-cyan-600"
          >
            Back to <span className="text-cyan-500">Arena</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((post) => (
            <div
              key={post.id}
              className="bg-zinc-500 text-white rounded-lg shadow-md shadow-white p-4 border border-gray-200 hover:bg-zinc-600 hover:shadow-lg"
            >
              <div className="relative w-full">
                <img src="/icon.jpg" alt="" className="w-80 h-48 pt-0 pb-1" />
                <button
                  onClick={() => toggleFavorite(post)}
                  className="absolute top-0 right-0 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md"
                >
                  <Delete className="text-white" />
                </button>
              </div>
              <h3 className="text-xl text-cyan-400 font-bold mb-2 tracking-wide">
                {post.title}
              </h3>
              <p className="text-slate-200 mb-4">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
