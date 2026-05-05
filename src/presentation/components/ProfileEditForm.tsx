import { Form, useActionData, useNavigation } from "react-router-dom";
import type { ProfileModel } from "../../domain/model/ProfileModel";

export const ProfileEditForm: React.FC<
  React.PropsWithChildren<{ profile: ProfileModel | undefined }>
> = ({ profile }) => {
  const data = useActionData() as { errors?: string[]; success?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {data?.errors && (
        <div style={{ padding: "8px 12px", background: "rgba(200,54,45,0.15)", border: "1px solid var(--red)" }}>
          {data.errors.map((err) => (
            <p key={err} style={{ color: "var(--red)", fontSize: 12 }}>{err}</p>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="name"
          className="muted"
          style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}
        >
          Name
        </label>
        <input
          name="name"
          type="text"
          id="name"
          defaultValue={profile?.name}
          className="input"
          placeholder="Your name"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="bio"
          className="muted"
          style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}
        >
          Bio
        </label>
        <textarea
          name="bio"
          id="bio"
          defaultValue={profile?.bio}
          className="input"
          style={{ height: 120, resize: "vertical" }}
          placeholder="Tell us about yourself…"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary"
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
      >
        {isSubmitting ? "Saving…" : "▶ Save Profile"}
      </button>
    </Form>
  );
};
