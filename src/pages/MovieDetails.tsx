import { useParams } from "react-router-dom";
import PageContainer from "../components/PageContainer";

export function MovieDetails() {
  let { id } = useParams();
  return (
    <PageContainer>
      <p>Details {id}</p>
    </PageContainer>
  );
}
