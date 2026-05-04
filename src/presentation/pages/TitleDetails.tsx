import PageContainer from "../components/PageContainer";
import Banner from "../components/Banner";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import {
  Link,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunction,
} from "react-router-dom";
import MoviewReviewItem from "../components/MovieReviewItem";
import { capitalize } from "../../utils/StringUtils";
import getTitleDetailsUseCase from "../../domain/usecases/getTitleDetailsUseCase";
import getTitleReviewsUseCase from "../../domain/usecases/getTitleReviewsUseCase";
import getTitleStreamUseCase from "../../domain/usecases/getTitleStreamUseCase";
import VideoPlayer from "../components/VideoPlayer";
import { getAuthToken } from "../../utils/auth";
import saveTitleReviewUseCase from "../../domain/usecases/saveTitleReviewUseCase";
import type ReviewModel from "../../domain/model/ReviewModel";
import type { TitleCastMemberModel } from "../../domain/model/TitleDetailsModel";

type ActionData = { ok: true; review: ReviewModel } | undefined;

export function TitleDetails() {
  const loaderData = useLoaderData();

  const details = loaderData?.details;
  const receivedReviews = loaderData?.reviews as ReviewModel[];
  const isUserLogged = loaderData?.isUserLogged as boolean;
  const cast = details?.cast as TitleCastMemberModel[] | undefined;

  const actionData = useActionData() as ActionData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [reviews, setReviews] = useState<ReviewModel[]>(receivedReviews);

  //todo call new usecase
  useEffect(() => {
    if (actionData?.ok && actionData.review) {
      setReviews((prevReviews) => [...prevReviews, actionData.review]);
      closeModal(); // Close modal after successful submission
    }
  }, [actionData]);

  if (!details) {
    return (
      <PageContainer>
        <div className="flex h-screen items-center justify-center">
          <p className="text-xl">Loading movie details...</p>
        </div>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <Banner image={details.poster}>
        <div className="grid h-full w-full sm:grid-cols-1 md:grid-cols-[auto_1fr]">
          <div className="flex min-h-[50vh] items-end p-4">
            <img src={details.poster} className="h-78 w-58 rounded-sm" />
          </div>

          <div className="flex items-end p-4 text-white">
            <div className="w-100">
              <h1 className="mb-4 text-3xl font-bold">{details.title}</h1>
              <h2 className="mb-4 text-2xl font-bold">
                {details.original_title}
              </h2>
              <p className="text-justify">
                {details.year} - {capitalize(details.type.replace("_", " "))}
              </p>
            </div>
          </div>
        </div>
      </Banner>
      <div className="mb-12 grid gap-2 sm:grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Sinopsis</h2>
          <p className="mb-6">{details.plot_overview}</p>

          {details.trailer && (
            <div className="pr-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Trailer</h2>
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <iframe
                  src={details.trailer.replace("watch?v=", "embed/")}
                  className="h-full w-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          )}
            

        </div>


        <div className="mt-6">

        <div className="rounded-md border-1 border-solid border-gray-300 p-4">

        <div className="mt-6">

        <div className="rounded-md border-1 border-solid border-gray-300 p-4">
          <h2 className="text mb-4 font-bold text-gray-800"> Movie details</h2>

          <div className="mb-2 flex w-full justify-between">
            <p>Genre</p>
            <p>{details.genre_names?.join(" / ")}</p>
          </div>
          <div className="mb-2 flex w-full justify-between">
            <p>Year</p>
            <p>{details.year}</p>
          </div>

          {details.runtime_minutes && (
            <div className="mb-2 flex w-full justify-between">
              <p>Duration</p>
              <p>{details.runtime_minutes} min.</p>
            </div>
          )}
          {details.user_rating && (
            <div className="flex w-full justify-between">
              <p>Rating</p>
              <p>{details.user_rating}</p>
            </div>
          )}
        </div>

        {cast && cast.filter((m) => m.type === "Cast" && m.order === 1).length > 0 && (
          <div className="mt-4 rounded-md border border-gray-300 p-4">
            <h2 className="mb-3 font-bold text-gray-800">Cast</h2>
            <ul className="space-y-2">
              {cast
                .filter((m) => m.type === "Cast" && m.order === 1)
                .map((member) => (
                  <li key={`${member.person_id}-${member.role}`}>
                    <Link
                      to={`/person/${member.person_id}`}
                      className="text-sm font-medium text-gray-900 hover:underline"
                    >
                      {member.full_name}
                    </Link>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {cast && cast.some((m) => m.type === "Crew" && m.order === 1 && (m.role.includes("Director") || m.role.includes("Writer"))) && (
          <div className="mt-4 rounded-md border border-gray-300 p-4">
            <h2 className="mb-3 font-bold text-gray-800">Crew</h2>

            {(["Director", "Writer"] as const).map((roleLabel) => {
              const members = cast
                .filter((m) => m.type === "Crew" && m.order === 1 && m.role.includes(roleLabel))
                .filter((m, i, arr) => arr.findIndex((x) => x.person_id === m.person_id) === i);

              if (members.length === 0) return null;

              return (
                <div key={roleLabel} className="mb-3 last:mb-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {roleLabel}
                  </p>
                  <p className="text-sm text-gray-900">
                    {members.map((member, i) => (
                      <span key={member.person_id}>
                        <Link to={`/person/${member.person_id}`} className="hover:underline">
                          {member.full_name}
                        </Link>
                        {i < members.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        </div>


      </div>



      </div>

     

      <div className="mb-4">
        <h2 className="bg mb-4 text-2xl font-bold text-gray-800">
          User Reviews
        </h2>

        {reviews.length > 0 ? (
          reviews.map((movie) => {
            return <MoviewReviewItem movie={movie} key={movie.id} />;
          })
        ) : (
          <p>No reviews yet :(</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Review">
        <ReviewForm externalId={details.id} />
      </Modal>
      {isUserLogged == true && (
        <div className="text-center">
          <button
            onClick={openModal}
            className="min-w-[120px] rounded border border-none px-6 py-2 text-center hover:bg-gray-300 focus:outline-none"
          >
            Send a review
          </button>
        </div>
      )}
    </PageContainer>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const reviewText = formData.get("review") as string;
  const externalTitleId = formData.get("externalTitleId") as string;

  const response = await saveTitleReviewUseCase({
    externalTitleId,
    review: reviewText,
  });

  return { ok: true, review: response };
}

export const titleDetailsLoader: LoaderFunction = async ({ params }) => {
  const id = params.externalId;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  const [details, reviews] = await Promise.all([
    getTitleDetailsUseCase(Number(id)),
    getTitleReviewsUseCase(Number(id)),
  ]);

  const isUserLogged: boolean =
    getAuthToken() !== "" && getAuthToken() !== undefined;

  return {
    details,
    reviews,
    isUserLogged,
  };
};
