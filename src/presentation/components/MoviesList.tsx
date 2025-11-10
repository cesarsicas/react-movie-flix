import React from "react";
import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";
import type MovieModel from "../../domain/model/MovieModel";

const MoviesList: React.FC<
  React.PropsWithChildren<{ movies: MovieModel[] }>
> = (props) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
        {props.movies.map((movie) => {
          return (
            <Link key={movie.id} to={`/movie/details/${movie.id}`}>
              <MovieItem movie={movie} showBottomInfo={true} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesList;
