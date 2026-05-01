import { Form, Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import Banner from "../components/Banner";
import PageContainer from "../components/PageContainer";
import { getTitlesList } from "../../data/api/titleApi";
import type { TitleListItem } from "../../data/model/TitleListResponse";

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "movie", label: "Movie" },
  { value: "tv_series", label: "TV Series" },
  { value: "tv_special", label: "TV Special" },
  { value: "tv_miniseries", label: "Miniseries" },
  { value: "short_film", label: "Short Film" },
];

const SORT_OPTIONS = [
  { value: "relevance_desc", label: "Relevance ↓" },
  { value: "relevance_asc", label: "Relevance ↑" },
  { value: "popularity_desc", label: "Popularity ↓" },
  { value: "popularity_asc", label: "Popularity ↑" },
  { value: "release_date_desc", label: "Release Date ↓" },
  { value: "release_date_asc", label: "Release Date ↑" },
  { value: "title_asc", label: "Title A–Z" },
  { value: "title_desc", label: "Title Z–A" },
];

const TYPE_LABELS: Record<string, string> = {
  movie: "Movie",
  tv_series: "TV Series",
  tv_special: "TV Special",
  tv_miniseries: "Miniseries",
  short_film: "Short Film",
};

interface LoaderData {
  titles: TitleListItem[];
  page: number | null;
  total_results: number;
  total_pages: number | null;
  filters: {
    types: string;
    sort_by: string;
    user_rating_low: string;
    user_rating_high: string;
    release_date_start: string;
    release_date_end: string;
    page: string;
  };
}

const selectClass =
  "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none";
const inputClass =
  "w-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none";

export default function Titles() {
  const { titles, page, total_pages, total_results, filters } =
    useLoaderData() as LoaderData;

  const hasPagination = page !== null && total_pages !== null;

  function buildPageUrl(targetPage: number) {
    const params = new URLSearchParams();
    if (filters.types) params.set("types", filters.types);
    if (filters.sort_by) params.set("sort_by", filters.sort_by);
    if (filters.user_rating_low) params.set("user_rating_low", filters.user_rating_low);
    if (filters.user_rating_high) params.set("user_rating_high", filters.user_rating_high);
    if (filters.release_date_start) params.set("release_date_start", filters.release_date_start);
    if (filters.release_date_end) params.set("release_date_end", filters.release_date_end);
    params.set("page", String(targetPage));
    return `/titles?${params.toString()}`;
  }

  return (
    <PageContainer>
      <Banner>
        <div className="flex h-[30vh] w-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-2 text-5xl md:text-6xl">Titles</h1>
          <p className="text-lg text-gray-200 md:text-xl">
            Browse and filter the full catalog
          </p>
        </div>
      </Banner>

      <div className="bg-gray-100 px-8 py-6">
        <Form method="get" action="/titles" className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Type</label>
            <select name="types" defaultValue={filters.types} className={selectClass}>
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Sort By</label>
            <select name="sort_by" defaultValue={filters.sort_by} className={selectClass}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Rating (0–10)</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                name="user_rating_low"
                placeholder="Min"
                min="0"
                max="10"
                step="0.1"
                defaultValue={filters.user_rating_low}
                className={inputClass}
              />
              <span className="text-gray-500">–</span>
              <input
                type="number"
                name="user_rating_high"
                placeholder="Max"
                min="0"
                max="10"
                step="0.1"
                defaultValue={filters.user_rating_high}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Release Year</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                name="release_date_start"
                placeholder="From"
                min="1900"
                max="2099"
                defaultValue={filters.release_date_start}
                className={inputClass}
              />
              <span className="text-gray-500">–</span>
              <input
                type="number"
                name="release_date_end"
                placeholder="To"
                min="1900"
                max="2099"
                defaultValue={filters.release_date_end}
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-md bg-gray-800 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Apply
          </button>
        </Form>
      </div>

      <div className="bg-gray-100 px-8 pb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Results{total_results > 0 ? ` (${total_results.toLocaleString()})` : ""}
          </h2>
          {hasPagination && (
            <span className="text-sm text-gray-500">
              Page {page} of {total_pages!.toLocaleString()}
            </span>
          )}
        </div>

        {titles.length > 0 ? (
          <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3">IMDb</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {titles.map((item, index) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-gray-400">
                        {((Number(filters.page) - 1) * 250) + index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/title/details/${item.externalId}`}
                          className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {TYPE_LABELS[item.type] ?? item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{item.year ?? "—"}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">
                        {item.imdb_id ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasPagination && (
              <div className="mt-4 flex items-center justify-center gap-4">
                {page! > 1 ? (
                  <Link
                    to={buildPageUrl(page! - 1)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    ← Prev
                  </Link>
                ) : (
                  <span className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-400">
                    ← Prev
                  </span>
                )}
                <span className="text-sm text-gray-600">
                  Page {page} of {total_pages!.toLocaleString()}
                </span>
                {page! < total_pages! ? (
                  <Link
                    to={buildPageUrl(page! + 1)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-400">
                    Next →
                  </span>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">No titles found for the selected filters.</p>
        )}
      </div>
    </PageContainer>
  );
}

export async function titlesLoader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);

  const types = url.searchParams.get("types") || "";
  const sort_by = url.searchParams.get("sort_by") || "relevance_desc";
  const user_rating_low = url.searchParams.get("user_rating_low") || "";
  const user_rating_high = url.searchParams.get("user_rating_high") || "";
  const releaseYearStart = url.searchParams.get("release_date_start") || "";
  const releaseYearEnd = url.searchParams.get("release_date_end") || "";
  const page = url.searchParams.get("page") || "1";

  const release_date_start = releaseYearStart ? `${releaseYearStart}0101` : "";
  const release_date_end = releaseYearEnd ? `${releaseYearEnd}1231` : "";

  const response = await getTitlesList({
    types: types || undefined,
    sort_by: sort_by || undefined,
    user_rating_low: user_rating_low || undefined,
    user_rating_high: user_rating_high || undefined,
    release_date_start: release_date_start || undefined,
    release_date_end: release_date_end || undefined,
    page,
  });

  return {
    titles: response.titles,
    page: response.page,
    total_results: response.total_results,
    total_pages: response.total_pages,
    filters: {
      types,
      sort_by,
      user_rating_low,
      user_rating_high,
      release_date_start: releaseYearStart,
      release_date_end: releaseYearEnd,
      page,
    },
  };
}
