import { useState } from "react";
import { redirect, useLoaderData, useNavigation, type ActionFunctionArgs } from "react-router-dom";
import { checkAdminAuthLoader } from "../../utils/adminAuth";
import { getAvailableMoviesUseCase } from "../../domain/usecases/getAvailableMoviesUseCase";
import { startTransmissionUseCase } from "../../domain/usecases/startTransmissionUseCase";
import type { WatchPartyMovieModel } from "../../domain/model/WatchPartyMovieModel";
import PageContainer from "../components/PageContainer";
import MoviePickerTable from "../components/MoviePickerTable";

export async function newTransmissionLoader() {
  const authResult = checkAdminAuthLoader();
  if (authResult) return authResult;
  const movies = await getAvailableMoviesUseCase();
  return { movies };
}

export async function newTransmissionAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const movieId = formData.get("movieId") as string;
  await startTransmissionUseCase(movieId);
  return redirect("/admin/watch-party");
}

export default function NewTransmission() {
  const { movies } = useLoaderData() as { movies: WatchPartyMovieModel[] };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [query, setQuery] = useState("");

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold">New Transmission</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 w-full max-w-sm rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <MoviePickerTable movies={filtered} isSubmitting={isSubmitting} />
    </PageContainer>
  );
}
