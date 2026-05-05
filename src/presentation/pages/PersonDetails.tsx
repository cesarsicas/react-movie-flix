import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import PageContainer from "../components/PageContainer";
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
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 32, marginBottom: 40 }}>
        {/* Sidebar */}
        <div>
          {/* Photo */}
          <div className="vhs-card" style={{ marginBottom: 16 }}>
            <div className="vhs-spine" />
            <div style={{ paddingLeft: 14 }}>
              <div className="poster">
                {person.headshot_url ? (
                  <img src={person.headshot_url} alt={person.full_name} />
                ) : (
                  <>
                    <div className="poster-stripes" />
                    <span className="poster-label">{person.full_name}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Person meta */}
          <div className="panel" style={{ padding: 16 }}>
            <div className="section-title" style={{ fontSize: 11 }}>Info</div>
            {[
              { label: "Profession", value: professions },
              { label: "Gender", value: genderLabel },
              { label: "Born", value: person.date_of_birth },
              { label: "Died", value: person.date_of_death },
              { label: "Birthplace", value: person.place_of_birth },
              { label: "IMDb", value: person.imdb_id },
            ]
              .filter((row) => row.value)
              .map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px dashed var(--line)",
                    fontSize: 13,
                  }}
                >
                  <span className="muted" style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>
                    {label}
                  </span>
                  <span
                    className={label === "IMDb" ? "font-mono" : ""}
                    style={{ fontSize: label === "IMDb" ? 11 : 13 }}
                  >
                    {value}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Main */}
        <div>
          <h1
            className="font-display"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "var(--label)", marginBottom: 8 }}
          >
            {person.full_name}
          </h1>
          {professions && (
            <p className="font-crt muted" style={{ fontSize: 16, letterSpacing: "0.08em", marginBottom: 24 }}>
              {professions.toUpperCase()}
            </p>
          )}

          <div className="section-title" style={{ marginBottom: 16 }}>
            <span className="num">●</span> Filmography
            <span className="font-crt muted" style={{ fontSize: 13 }}>({titles.length})</span>
          </div>

          {titles.length > 0 ? (
            <div className="panel" style={{ overflow: "hidden" }}>
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line-strong)" }}>
                    {["Title", "Type", "Year"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--label-dim)",
                          fontWeight: 600,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {titles.map((title) => (
                    <tr
                      key={title.id}
                      style={{ borderBottom: "1px solid var(--line)", transition: "background 0.1s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    >
                      <td style={{ padding: "10px 14px" }}>
                        <Link to={`/title/details/${title.externalId}`} className="link">
                          {title.title}
                        </Link>
                      </td>
                      <td style={{ padding: "10px 14px", color: "var(--label-dim)", textTransform: "capitalize" }}>
                        {title.type.replace(/_/g, " ")}
                      </td>
                      <td style={{ padding: "10px 14px", color: "var(--label-dim)" }}>
                        {title.releaseDate || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="dashed-box muted" style={{ textAlign: "center" }}>No titles found.</div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export async function personDetailsLoader({ params }: LoaderFunctionArgs): Promise<LoaderData> {
  const personId = Number(params.personId);
  if (!personId) throw new Response("Person not found", { status: 404 });

  const [person, { titles }] = await Promise.all([
    getPersonUseCase(personId),
    getTitlesListUseCase({ person_id: String(personId) }),
  ]);

  return { person, titles };
}
