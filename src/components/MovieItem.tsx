import type { MovieModel } from "../model/MovieModel";

const MovieItem: React.FC<
  React.PropsWithChildren<{ movie: MovieModel; showBottomInfo: Boolean }>
> = (props) => {
  return (
    <div
      key={props.movie.id}
      className="max-w-80 transform cursor-pointer overflow-hidden rounded-md bg-white shadow-xl transition duration-300 hover:scale-[1.02]"
    >
      {props.movie.posterUrl && (
        <img
          src={props.movie.posterUrl}
          alt={`Poster for ${props.movie.title}`}
          className="h-94 w-full object-cover"
        />
      )}

      {props.showBottomInfo && (
        <div className="p-4 text-sm">
          <h3 className="line-clamp-2 h-14 text-base font-semibold text-gray-900">
            {props.movie.title}
          </h3>

          <div className="flex w-full justify-between">
            <div className="mb-4 rounded-b-sm bg-gray-200 px-2 py-1">
              {props.movie.genres[0]}
            </div>
            <div>{props.movie.year}</div>
          </div>

          <p className="text-xm line-clamp-2 text-ellipsis text-gray-700">
            {props.movie.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
