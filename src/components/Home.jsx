import { Link } from "react-router-dom";
import { Star, StarBorder } from "@mui/icons-material";
export default function Home({
  posts,
  favorites,
  toggleFavorite,
  handleSearch,
  searchTerm,
  loading,
  error,
  currentPage,
  postsPerPage,
  handlePageChange,
}) {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="min-h-screen bg-zinc-800 py-8 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 tracking-wide border-b-2">
          Blog<span className="text-red-500">Arena</span>
        </h1>

        {loading && (
          <p className="text-center text-2xl  mt-72 font-extrabold tracking-wide text-white">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-center text-2xl mt-72 font-extrabold tracking-wide text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className=" mb-6">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearch}
                className="border absolute top-5 right-60 bg-zinc-600 border-white rounded-lg px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className=" mb-6">
              <Link
                to="/favorites"
                className="bg-zinc-700 absolute top-5 right-12 text-white font-bold px-2 py-2 rounded-lg shadow-md hover:bg-blue-600"
              >
                <span className="text-yellow-500">Favorite</span> Blogs
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {currentPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-zinc-500 text-white rounded-lg shadow-lg p-4 border border-gray-200 hover:bg-zinc-600"
                >
                  <div className="relative w-full">
                    <img
                      src="/icon.jpg"
                      alt=""
                      className="w-80 h-48 pt-0 pb-1"
                    />
                    <button
                      onClick={() => toggleFavorite(post)}
                      className={` absolute top-0 right-0 px-4 py-2 rounded-md shadow-md ${
                        favorites.includes(post)
                          ? "bg-yellow-300 text-white hover:bg-yellow-500"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {favorites.includes(post) ? (
                        <Star className="text-white" />
                      ) : (
                        <StarBorder className="text-white" />
                      )}
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-wide ">
                    {post.title}
                  </h3>
                  <p className="text-slate-200 mb-4">{post.body}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              {Array.from({
                length: Math.ceil(posts.length / postsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-4 py-2 rounded-lg shadow-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
