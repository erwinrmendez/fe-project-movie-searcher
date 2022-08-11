import { Movie } from "../components/MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=68b89ab2&s=";

/**
 * fetches movies from api by search term
 *
 * @param searchTerm [string]
 */
export const getAllMoviesBySearchTerm = async (
  searchTerm: string
): Promise<Movie[]> => {
  const res = await fetch(`${API_URL}${searchTerm}`);
  const data = await res.json();
  const { Response, Search } = data;

  if (Response === "True") {
    const movies: Movie[] = Search.map((item: any) => ({
      title: item.Title,
      year: item.Year,
      imdbId: item.imdbId,
      poster: item.Poster,
    }));

    return movies;
  } else {
    return [];
  }
};
