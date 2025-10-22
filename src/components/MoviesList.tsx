import React from "react";
import { MovieModel } from "../model/MovieModel";
import { Link } from "react-router-dom";

const dummyMovies: MovieModel[] = [
  {
    id: "1",
    title: "The Lord of the Rings: The Two Towers",
    posterUrl: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
    description:
      "Frodo and Samwise continue their journey toward Mordor, while Aragorn, Legolas, and Gimli join forces with the besieged people of Rohan and the resurrected Gandalf the White in the battle against Saruman's forces.",
    year: "2002",
    genres: ["Fantasy", "Adventure", "Action"],
  },
  {
    id: "2",
    title: "Star Wars: The Empire Strikes Back",
    posterUrl: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
    description:
      "Three years after the destruction of the Death Star, the Imperial fleet pursues the Rebel Alliance. Luke Skywalker trains with Jedi Master Yoda, while Han Solo and Princess Leia evade Darth Vader's forces.",
    year: "1980",
    genres: ["Sci-Fi", "Adventure", "Action"],
  },
  {
    id: "3",
    title: "The Green Mile",
    posterUrl: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
    description:
      "The life of a Depression-era death row correctional officer is forever changed by the arrival of a massive, mysterious Black man condemned for the murder of two young girls, who possesses a miraculous gift.",
    year: "1999",
    genres: ["Drama", "Fantasy", "Mystery"],
  },
  {
    id: "4",
    title: "The Departed",
    posterUrl: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
    description:
      "A police mole infiltrates a Boston mob, while the mob implants one of its own into the Massachusetts State Police. When both sides realize they have a mole, a deadly cat-and-mouse game ensues.",
    year: "2006",
    genres: ["Crime", "Thriller", "Drama"],
  },
  {
    id: "5",
    title: "Se7en",
    posterUrl: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
    description:
      "Two homicide detectives, a jaded veteran and an eager newcomer, hunt a serial killer who uses the seven deadly sins as his gruesome motivation for a series of murders.",
    year: "1995",
    genres: ["Crime", "Thriller", "Mystery"],
  },
];
const MoviesList: React.FC<React.PropsWithChildren<{}>> = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {dummyMovies.map((movie) => {
          return (
            <Link key={movie.id} to={`/movie/details/${movie.id}`}>
              <div
                key={movie.id}
                className="max-w-80 transform cursor-pointer overflow-hidden rounded-md bg-white shadow-xl transition duration-300 hover:scale-[1.02]"
              >
                {movie.posterUrl && (
                  <img
                    src={movie.posterUrl}
                    alt={`Poster for ${movie.title}`}
                    className="h-94 w-full object-cover"
                  />
                )}

                <div className="p-4 text-sm">
                  <h3 className="line-clamp-2 h-14 text-base font-semibold text-gray-900">
                    {movie.title}
                  </h3>

                  <div className="flex w-full justify-between">
                    <div className="mb-4 rounded-b-sm bg-gray-200 px-2 py-1">
                      {movie.genres[0]}
                    </div>
                    <div>{movie.year}</div>
                  </div>

                  <p className="text-xm line-clamp-2 text-ellipsis text-gray-700">
                    {movie.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesList;
