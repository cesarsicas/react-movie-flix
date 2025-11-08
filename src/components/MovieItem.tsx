import placeholder from "../assets/poster_placeholder.png";
import type MovieModel from "../model/MovieModel";

const MovieItem: React.FC<
  React.PropsWithChildren<{ movie: MovieModel; showBottomInfo: Boolean }>
> = (props) => {
  return (
    <div
      key={props.movie.id}
      className="max-w-65 transform cursor-pointer overflow-hidden rounded-md bg-white shadow-xl transition duration-300 hover:scale-[1.02]"
    >
      <img
        src={props.movie.posterUrl ? props.movie.posterUrl : placeholder}
        alt={`Poster for ${props.movie.title}`}
        className="h-94 w-full object-cover"
      />

      {props.showBottomInfo && (
        <div className="p-3">
          <h3 className="line-clamp-1 text-center font-semibold text-gray-900">
            {props.movie.title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
