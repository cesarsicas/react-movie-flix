import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import Banner from "../components/Banner";
import placeholder from "../../assets/poster_placeholder.png";
import type { PersonModel } from "../../domain/model/PersonModel";
import getPersonUseCase from "../../domain/usecases/getPersonUseCase";

interface LoaderData {
  person: PersonModel;
}

export default function PersonDetails() {
  const { person } = useLoaderData() as LoaderData;

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

      <div className="mx-auto max-w-5xl px-4 py-8">
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

          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Known For</h2>
            {person.known_for.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {person.known_for.map((titleId) => (
                  <Link
                    key={titleId}
                    to={`/title/details/${titleId}`}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all"
                  >
                    Title #{titleId}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No known titles on record.</p>
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

  const person = await getPersonUseCase(personId);
  return { person };
}
