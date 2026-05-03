import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import Banner from "../components/Banner";
import placeholder from "../../assets/poster_placeholder.png";
import type { PersonModel } from "../../domain/model/PersonModel";
import type MovieModel from "../../domain/model/MovieModel";
import getPersonUseCase from "../../domain/usecases/getPersonUseCase";
import getTitlesListUseCase from "../../domain/usecases/getTitlesListUseCase";

interface LoaderData {
  person: PersonModel;
  titles: MovieModel[];
}

export default function PersonDetails() {
  const { person, titles } = useLoaderData() as LoaderData;

  const professions = [
    person.main_profession,
    person.secondary_profession,
    person.tertiary_profession,
  ]
    .filter(Boolean)
    .join(" · ");

  const genderLabel =
    person.gender === "m" ? "Male" : person.gender === "f" ? "Female" : null;

  return (
    <PageContainer>
      <Banner>
        <div className="flex h-[30vh] w-full items-center justify-center text-center text-white">
          <h1 className="text-5xl font-bold md:text-6xl">{person.full_name}</h1>
        </div>
      </Banner>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-shrink-0 md:w-64">
            <img
              src={person.headshot_url || placeholder}
              alt={person.full_name}
              className="w-full rounded-lg object-cover shadow-lg"
            />

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              {professions && (
                <div>
                  <span className="font-semibold">Profession</span>
                  <p className="capitalize">{professions}</p>
                </div>
              )}
              {genderLabel && (
                <div>
                  <span className="font-semibold">Gender</span>
                  <p>{genderLabel}</p>
                </div>
              )}
              {person.date_of_birth && (
                <div>
                  <span className="font-semibold">Born</span>
                  <p>{person.date_of_birth}</p>
                </div>
              )}
              {person.date_of_death && (
                <div>
                  <span className="font-semibold">Died</span>
                  <p>{person.date_of_death}</p>
                </div>
              )}
              {person.place_of_birth && (
                <div>
                  <span className="font-semibold">Place of Birth</span>
                  <p>{person.place_of_birth}</p>
                </div>
              )}
              {person.imdb_id && (
                <div className="pt-2">
                  <span className="font-semibold">IMDb ID</span>
                  <p className="font-mono text-xs">{person.imdb_id}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Titles</h2>
            {titles.length > 0 ? (
              <table className="w-full text-left text-sm text-gray-700">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                    <th className="pb-2 pr-4">Title</th>
                    <th className="pb-2 pr-4">Type</th>
                    <th className="pb-2">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {titles.map((title) => (
                    <tr
                      key={title.id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      <td className="py-2 pr-4 font-medium">
                        <Link
                          to={`/title/details/${title.externalId}`}
                          className="text-gray-900 hover:underline"
                        >
                          {title.title}
                        </Link>
                      </td>
                      <td className="py-2 pr-4 capitalize text-gray-500">
                        {title.type.replace(/_/g, " ")}
                      </td>
                      <td className="py-2 text-gray-500">{title.releaseDate || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No titles found.</p>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export async function personDetailsLoader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const personId = Number(params.personId);

  if (!personId) {
    throw new Response("Person not found", { status: 404 });
  }

  const [person, { titles }] = await Promise.all([
    getPersonUseCase(personId),
    getTitlesListUseCase({ person_id: String(personId) }),
  ]);

  return { person, titles };
}
