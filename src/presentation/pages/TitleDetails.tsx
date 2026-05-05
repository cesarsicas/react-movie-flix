import PageContainer from "../components/PageContainer";
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
import { getAuthToken } from "../../utils/auth";
import saveTitleReviewUseCase from "../../domain/usecases/saveTitleReviewUseCase";
import type ReviewModel from "../../domain/model/ReviewModel";
import type { TitleCastMemberModel } from "../../domain/model/TitleDetailsModel";
import placeholder from "../../assets/poster_placeholder.png";

type ActionData = { ok: true; review: ReviewModel } | undefined;

export function TitleDetails() {
  const loaderData = useLoaderData();
  const details = loaderData?.details;
  const receivedReviews = loaderData?.reviews as ReviewModel[];
  const isUserLogged = loaderData?.isUserLogged as boolean;
  const cast = details?.cast as TitleCastMemberModel[] | undefined;

  const actionData = useActionData() as ActionData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewModel[]>(receivedReviews);

  useEffect(() => {
    if (actionData?.ok && actionData.review) {
      setReviews((prev) => [...prev, actionData.review]);
      setIsModalOpen(false);
    }
  }, [actionData]);

  if (!details) {
    return (
      <PageContainer>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
          <p className="font-crt" style={{ fontSize: 22, color: "var(--amber)", letterSpacing: "0.1em" }}>
            LOADING…
          </p>
        </div>
      </PageContainer>
    );
  }

  const mainCast = cast?.filter((m) => m.type === "Cast" && m.order === 1) ?? [];
  const directors = (cast ?? [])
    .filter((m) => m.type === "Crew" && m.order === 1 && m.role.includes("Director"))
    .filter((m, i, arr) => arr.findIndex((x) => x.person_id === m.person_id) === i);
  const writers = (cast ?? [])
    .filter((m) => m.type === "Crew" && m.order === 1 && m.role.includes("Writer"))
    .filter((m, i, arr) => arr.findIndex((x) => x.person_id === m.person_id) === i);

  return (
    <>
      {/* Hero */}
      <div
        className="hero grain scanlines"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 380,
        }}
      >
        {/* BG image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${details.poster || placeholder})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.3) blur(8px)",
            transform: "scale(1.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, var(--bg) 30%, transparent 70%)",
          }}
        />
        <div className="tracking-line" />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: 1400,
            margin: "0 auto",
            padding: "40px 28px",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 32,
            alignItems: "flex-end",
          }}
        >
          {/* Poster */}
          <div
            className="vhs-card"
            style={{ width: 160, flexShrink: 0, pointerEvents: "none" }}
          >
            <div className="vhs-spine" />
            <div style={{ paddingLeft: 14 }}>
              <div className="poster">
                {details.poster ? (
                  <img src={details.poster} alt={details.title} />
                ) : (
                  <>
                    <div className="poster-stripes" />
                    <span className="poster-label">{details.title}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              {details.genre_names?.slice(0, 3).map((g: string) => (
                <span key={g} className="sticker flat" style={{ fontSize: 12 }}>{g}</span>
              ))}
            </div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: 0.95,
                color: "var(--label)",
                marginBottom: 8,
              }}
            >
              {details.title}
            </h1>
            {details.original_title && details.original_title !== details.title && (
              <p className="muted" style={{ fontSize: 14, marginBottom: 8 }}>
                {details.original_title}
              </p>
            )}
            <div className="font-crt muted" style={{ fontSize: 15, letterSpacing: "0.08em", marginBottom: 20 }}>
              {details.year} · {capitalize(details.type.replace(/_/g, " "))}
              {details.runtime_minutes ? ` · ${details.runtime_minutes} MIN` : ""}
              {details.user_rating ? ` · ★ ${details.user_rating}` : ""}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-primary">▶ Play</button>
              {isUserLogged && (
                <button className="btn btn-ghost" onClick={() => setIsModalOpen(true)}>
                  + Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <PageContainer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 32,
            marginTop: 28,
            marginBottom: 40,
          }}
        >
          {/* Main column */}
          <div>
            {/* Synopsis */}
            <div style={{ marginBottom: 28 }}>
              <div className="section-title">
                <span className="num">●</span> Synopsis
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--label-dim)" }}>
                {details.plot_overview || "No synopsis available."}
              </p>
            </div>

            {/* Trailer */}
            {details.trailer && (
              <div style={{ marginBottom: 28 }}>
                <div className="section-title">
                  <span className="num">●</span> Trailer
                </div>
                <div className="crt" style={{ aspectRatio: "16/9" }}>
                  <div className="tracking-line" />
                  <iframe
                    src={details.trailer.replace("watch?v=", "embed/")}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            )}

            {/* Reviews */}
            <div>
              <div className="section-title" style={{ marginBottom: 16 }}>
                <span className="num">●</span> User Reviews
                <span className="font-crt muted" style={{ fontSize: 13 }}>
                  ({reviews.length})
                </span>
              </div>
              {reviews.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {reviews.map((review) => (
                    <MoviewReviewItem key={review.id} movie={review} />
                  ))}
                </div>
              ) : (
                <div className="dashed-box muted" style={{ fontSize: 13, textAlign: "center" }}>
                  No reviews yet. Be the first to review!
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Movie details */}
            <div className="panel" style={{ padding: 18, marginBottom: 20 }}>
              <div className="section-title" style={{ fontSize: 11 }}>Details</div>
              {[
                { label: "Genre", value: details.genre_names?.join(" / ") },
                { label: "Year", value: details.year },
                { label: "Duration", value: details.runtime_minutes ? `${details.runtime_minutes} min` : null },
                { label: "Rating", value: details.user_rating ? `★ ${details.user_rating}` : null },
                { label: "Type", value: capitalize(details.type.replace(/_/g, " ")) },
              ]
                .filter((row) => row.value)
                .map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: "1px dashed var(--line)",
                      fontSize: 13,
                    }}
                  >
                    <span className="muted">{label}</span>
                    <span style={{ textAlign: "right", maxWidth: "55%" }}>{value}</span>
                  </div>
                ))}
            </div>

            {/* Cast */}
            {mainCast.length > 0 && (
              <div className="panel" style={{ padding: 18, marginBottom: 20 }}>
                <div className="section-title" style={{ fontSize: 11 }}>Cast</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {mainCast.slice(0, 8).map((member) => (
                    <li key={`${member.person_id}-${member.role}`}>
                      <Link to={`/person/${member.person_id}`} className="link" style={{ fontSize: 13 }}>
                        {member.full_name}
                      </Link>
                      <p className="muted" style={{ fontSize: 11, marginTop: 1 }}>{member.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Crew */}
            {(directors.length > 0 || writers.length > 0) && (
              <div className="panel" style={{ padding: 18 }}>
                <div className="section-title" style={{ fontSize: 11 }}>Crew</div>
                {directors.length > 0 && (
                  <div style={{ marginBottom: 10 }}>
                    <p className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                      Director
                    </p>
                    <p style={{ fontSize: 13 }}>
                      {directors.map((m, i) => (
                        <span key={m.person_id}>
                          <Link to={`/person/${m.person_id}`} className="link">{m.full_name}</Link>
                          {i < directors.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
                {writers.length > 0 && (
                  <div>
                    <p className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                      Writer
                    </p>
                    <p style={{ fontSize: 13 }}>
                      {writers.map((m, i) => (
                        <span key={m.person_id}>
                          <Link to={`/person/${m.person_id}`} className="link">{m.full_name}</Link>
                          {i < writers.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a Review">
          <ReviewForm externalId={details.id} />
        </Modal>
      </PageContainer>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const reviewText = formData.get("review") as string;
  const externalTitleId = formData.get("externalTitleId") as string;
  const response = await saveTitleReviewUseCase({ externalTitleId, review: reviewText });
  return { ok: true, review: response };
}

export const titleDetailsLoader: LoaderFunction = async ({ params }) => {
  const id = params.externalId;
  if (!id) throw new Response("Not Found", { status: 404 });

  const [details, reviews] = await Promise.all([
    getTitleDetailsUseCase(Number(id)),
    getTitleReviewsUseCase(Number(id)),
  ]);

  const isUserLogged = getAuthToken() !== "" && getAuthToken() !== undefined;
  return { details, reviews, isUserLogged };
};
