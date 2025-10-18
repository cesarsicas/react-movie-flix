import React from "react";
import { MovieModel } from "../model/MovieModel";

// --- Dummy Data (Remains the same) ---
const dummyMovies: MovieModel[] = [
  new MovieModel("1", "The Matrix", "https://picsum.photos/id/237/200/300"),
  new MovieModel("2", "Inception", "https://picsum.photos/id/169/200/300"),
  new MovieModel("3", "Pulp Fiction", "https://picsum.photos/id/10/200/300"),
  new MovieModel("4", "Interstellar", "https://picsum.photos/id/1018/200/300"),
  new MovieModel("5", "Alien", "https://picsum.photos/id/354/200/300"),
  new MovieModel("6", "Arrival", "https://picsum.photos/id/30/200/300"),
  new MovieModel("7", "Dune", "https://picsum.photos/id/1040/200/300"),
  new MovieModel(
    "8",
    "Blade Runner 2049",
    "https://picsum.photos/id/312/200/300",
  ),
  new MovieModel("9", "Parasite", "https://picsum.photos/id/1043/200/300"),
  new MovieModel(
    "10",
    "Spirited Away",
    "https://picsum.photos/id/1074/200/300",
  ),
];

const MoviesList: React.FC<React.PropsWithChildren<{}>> = () => {
  return (
    <div className="bg-gray-100 p-4 sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Popular Movies</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {dummyMovies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl transition duration-300 hover:scale-[1.02]"
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
