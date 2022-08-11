import React from "react";

export interface Movie {
  title: string;
  year: string;
  imdbId: string;
  poster: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { title, year, imdbId, poster } = movie;
  return (
    <div className="border border-slate-50 hover:border-slate-100 hover:bg-slate-50 transition-all duration-300 ease-in-out">
      <img src={poster} alt={title} className="w-full h-60 object-cover" />
      <div className="text-center">
        <h2 className="font-bold py-2">{title}</h2>
        <p className="text-slate-600">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
