import React, { useEffect, useState } from "react";
import { getAllMoviesBySearchTerm } from "./api/movie";
import MovieCard, { Movie } from "./components/MovieCard";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    // only start searching if search term is longer than three characters.
    if (searchTerm.length >= 3) {
      (async function () {
        setLoading(true);

        try {
          const data = await getAllMoviesBySearchTerm(searchTerm);
          setMovies(data);
        } catch (error) {
          setError(
            "Sorry! There has been an error while trying to fetch the movies. Please try again at a later time."
          );
        }
        // reset loading state back to false.
        setLoading(false);
      })();
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  return (
    <div className="p-5 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-center py-4">Movie Searher</h1>
      <div className="mb-4 w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search movie by title..."
          // value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-slate-300 rounded-md outline-slate-400"
        />
      </div>
      <div className="flex-1">
        {searchTerm === "" ? (
          <Div>Start searching your favorite movies.</Div>
        ) : loading ? (
          <Div>Loading...</Div>
        ) : error ? (
          <Div>{error}</Div>
        ) : movies.length === 0 ? (
          <Div>There are no movies to show for the given search input.</Div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 py-4">
            {movies.map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Div: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-full text-slate-500 my-auto text-center">
      {children}
    </div>
  );
};

export default App;
