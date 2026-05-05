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
      <div style={{ marginBottom: 24 }}>
        <div className="section-title">
          <span className="num">CH 77</span>
          New Transmission
        </div>
      </div>

      <input
        type="text"
        placeholder="Search movies…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
        style={{ maxWidth: 360, marginBottom: 20 }}
      />

      <MoviePickerTable movies={filtered} isSubmitting={isSubmitting} />
    </PageContainer>
  );
}
