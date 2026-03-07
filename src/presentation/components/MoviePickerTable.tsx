import { Form } from "react-router-dom";
import type { WatchPartyMovieModel } from "../../domain/model/WatchPartyMovieModel";

interface Props {
  movies: WatchPartyMovieModel[];
  isSubmitting: boolean;
}

export default function MoviePickerTable({ movies, isSubmitting }: Props) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-left text-gray-500">
          <th className="pb-3 pr-4 font-medium">Title</th>
          <th className="pb-3 pr-4 font-medium">Duration</th>
          <th className="pb-3 pr-4 font-medium">Filename</th>
          <th className="pb-3 font-medium">Action</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => {
          const hours = Math.floor(movie.duration / 60);
          const mins = movie.duration % 60;
          const duration = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
          return (
            <tr key={movie.id} className="border-b border-gray-100 even:bg-gray-50">
              <td className="py-3 pr-4">{movie.title}</td>
              <td className="py-3 pr-4 text-gray-600">{duration}</td>
              <td className="py-3 pr-4 font-mono text-gray-500">{movie.filename}</td>
              <td className="py-3">
                <Form method="post">
                  <input type="hidden" name="movieId" value={movie.id} />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded bg-slate-800 px-3 py-1 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Select
                  </button>
                </Form>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
