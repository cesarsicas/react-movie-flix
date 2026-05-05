import React from "react";
import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";
import type MovieModel from "../../domain/model/MovieModel";

const MoviesList: React.FC<
  React.PropsWithChildren<{ movies: MovieModel[] }>
> = ({ movies }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14,
      }}
      className="sm:grid-cols-4 lg:grid-cols-6"
    >
      {movies.map((movie) => (
        <Link key={movie.id} to={`/title/details/${movie.externalId}`} style={{ textDecoration: "none" }}>
          <MovieItem movie={movie} showBottomInfo={true} />
        </Link>
      ))}
    </div>
  );
};

export default MoviesList;
