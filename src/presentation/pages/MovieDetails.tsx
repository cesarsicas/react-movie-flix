import PageContainer from "../components/PageContainer";
import Banner from "../components/Banner";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import {
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunction,
} from "react-router-dom";
import MoviewReviewItem from "../components/MovieReviewItem";
import { capitalize } from "../../utils/StringUtils";
import ReviewModel from "../../domain/model/ReviewModel";
import type { TitleDetailsModel } from "../../domain/model/TitleDetailsModel";
import getTitleDetailsUseCase from "../../domain/usecases/getTitleDetailsUseCase";
import getTitleReviewsUseCase from "../../domain/usecases/getTitleReviewsUseCase";

type ActionData = { ok: true; review: ReviewModel } | undefined;

export function MovieDetails() {
  const loaderData = useLoaderData();

  const details = loaderData?.details;
  const receivedReviews = loaderData?.reviews as ReviewModel[];

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
          <h2 className="text-2xl font-bold text-gray-800">Cast and Crew</h2>
          <h3>Director</h3>
          <p>Michael Chen</p>
          <h3>Cast</h3>
          <p>John Harrison, Sarah Mitchell, David Rodriguez</p>
        </div>

        <div className="mt-6 rounded-md border-1 border-solid border-gray-300 p-4">
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
        <ReviewForm />
      </Modal>

      <div className="text-center">
        <button
          onClick={openModal}
          className="min-w-[120px] rounded border border-none px-6 py-2 text-center hover:bg-gray-300 focus:outline-none"
        >
          Send a review
        </button>
      </div>
    </PageContainer>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const reviewText = formData.get("review") as string;

  const newReview = new ReviewModel(
    `id-${Date.now()}`,
    "CurrentUser", //todo
    reviewText,
  );

  console.log(newReview);

  // TODO: api call

  return { ok: true, review: newReview };
}

export const titleDetailsLoader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  const details = await getTitleDetailsUseCase(Number(id));
  const reviews = await getTitleReviewsUseCase(Number(id));

  return { details: details, reviews: reviews };
};
