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
      <h2>Synopsis</h2>
      <p>
        An elite special forces operative must infiltrate a terrorist
        organization to prevent a global catastrophe. With time running out,
        every decision could mean the difference between salvation and
        destruction.
      </p>
      <h2>Cast and Crew</h2>
      <h3>Director</h3>
      <p>Michael Chen</p>
      <h3>Cast</h3>
      <p>John Harrison, Sarah Mitchell, David Rodriguez</p>
    </PageContainer>
  );
}
