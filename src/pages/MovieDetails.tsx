import { useParams } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import movieTheater from "../assets/movie_theater2.png";
import Banner from "../components/Banner";
import MovieItem from "../components/MovieItem";
import { MovieModel } from "../model/MovieModel";

export function MovieDetails() {
  let { id } = useParams();
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
      <div className="mb-6 grid gap-2 sm:grid-cols-1 md:grid-cols-[2fr_1fr]">
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

      <div>
        <h2 className="bg text-2xl font-bold text-gray-800">User Reviews</h2>

        <div className="mb-4 rounded-md border-1 border-solid border-gray-300 p-4">
          <div className="mb-2 flex items-center">
            <span className="h-[30px] w-[30px] rounded-[15px] bg-gray-900" />
            <div className="mx-2">
              <p>ActionFan23</p>
              <p className="text-xs text-gray-500">2024-09-14</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Solid performances and impressive cinematography.
          </p>
        </div>

        <div className="rounded-md border-1 border-solid border-gray-300 p-4">
          <div className="mb-2 flex items-center">
            <span className="h-[30px] w-[30px] rounded-[15px] bg-gray-900" />
            <div className="mx-2">
              <p>ActionFan23</p>
              <p className="text-xs text-gray-500">2024-09-14</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Solid performances and impressive cinematography.
          </p>
        </div>
      </div>

      <div></div>
    </PageContainer>
  );
}
