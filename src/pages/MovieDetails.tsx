import PageContainer from "../components/PageContainer";
import Banner from "../components/Banner";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import { useActionData, type ActionFunctionArgs } from "react-router-dom";
import ReviewModel from "../model/ReviewModel";
import MoviewReviewItem from "../components/MovieReviewItem";

type ActionData = { ok: true; review: ReviewModel } | undefined;

export function MovieDetails() {
  //let { id } = useParams(); todo
  const actionData = useActionData() as ActionData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  // Load initial reviews
  useEffect(() => {
    setReviews([
      new ReviewModel(
        "id-1",
        "ActionFan23",
        "Solid performances and impressive cinematography.",
      ),
      new ReviewModel("id-2", "ScyFyRule", "Best movie ever."),
    ]);
  }, []);

  // Handle new review submission
  useEffect(() => {
    if (actionData?.ok && actionData.review) {
      setReviews((prevReviews) => [...prevReviews, actionData.review]);
      closeModal(); // Close modal after successful submission
    }
  }, [actionData]);

  return (
    <PageContainer>
      <Banner>
        <div className="grid h-full w-full sm:grid-cols-1 md:grid-cols-[auto_1fr]">
          <div className="flex min-h-[50vh] items-end p-4">
            <img
              src="https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg"
              className="h-78 w-58 rounded-sm"
            />
          </div>

          <div className="flex items-end p-4 text-white">
            <div className="w-100">
              <h1 className="mb-4 text-3xl font-bold">
                Operation Thunderstrike
              </h1>
              <p className="text-justify">
                In a future where time travel is possible, a team of scientists
                must prevent a paradox that could unravel reality itself. A
                mind-bending journey through space and time.
              </p>
            </div>
          </div>
        </div>
      </Banner>
      <div className="mb-12 grid gap-2 sm:grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Sinopsis</h2>
          <p className="mb-6">
            An elite special forces operative must infiltrate a terrorist
            organization to prevent a global catastrophe. With time running out,
            every decision could mean the difference between salvation and
            destruction.
          </p>
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
            <p>Action</p>
          </div>
          <div className="mb-2 flex w-full justify-between">
            <p>Year</p>
            <p>2005</p>
          </div>
          <div className="mb-2 flex w-full justify-between">
            <p>Duration</p>
            <p>2h 15min</p>
          </div>
          <div className="flex w-full justify-between">
            <p>Rating</p>
            <p>4/5</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="bg mb-4 text-2xl font-bold text-gray-800">
          User Reviews
        </h2>

        {reviews.map((movie) => {
          return <MoviewReviewItem movie={movie} key={movie.id} />;
        })}
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
    "CurrentUser", // In real app, get from auth context
    reviewText,
  );

  // TODO: In real app, make API call here
  // const response = await fetch('/api/reviews', { method: 'POST', body: formData });
  // if (!response.ok) throw new Error('Failed to submit review');

  return { sucess: newReview };
}
