import React from "react";
import { MovieModel } from "../model/MovieModel";
const dummyMovies: MovieModel[] = [
  new MovieModel(
    "1",
    "The Lord of the Rings: The Two Towers",
    "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
  ),
  new MovieModel(
    "2",
    "Star Wars: The Empire Strikes Back",
    "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
  ),
  new MovieModel(
    "3",
    "The Green Mile",
    "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
  ),
  new MovieModel(
    "4",
    "The Departed",
    "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
  ),
  new MovieModel(
    "5",
    "Se7en",
    "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
  ),
];

const MoviesList: React.FC<React.PropsWithChildren<{}>> = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {dummyMovies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-full max-w-[250px] transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl transition duration-300 hover:scale-[1.02]"
            >
              {movie.imageUrl && (
                <img
                  src={movie.imageUrl}
                  alt={`Poster for ${movie.name}`}
                  className="h-64 w-full object-cover sm:h-72"
                />
              )}

              <div className="p-3 text-center">
                <p className="sm:text-md truncate text-sm font-semibold text-gray-900">
                  {movie.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesList;
