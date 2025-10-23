import { useParams } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import movieTheater from "../assets/movie_theater2.png";
import Banner from "../components/Banner";

export function MovieDetails() {
  let { id } = useParams();
  return (
    <PageContainer>
      <Banner>
        <div className="tems-center flex h-full w-full flex-col justify-center text-center text-white">
          <img
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
