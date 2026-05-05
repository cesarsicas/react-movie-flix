import { Form, useActionData, useNavigation } from "react-router-dom";

const ReviewForm: React.FC<{ externalId: string }> = ({ externalId }) => {
  const data = useActionData() as { errors?: string[] } | undefined;
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

      <input id="externalTitleId" name="externalTitleId" type="hidden" value={externalId} readOnly />

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="review"
          className="muted"
          style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}
        >
          Your Review
        </label>
        <textarea
          name="review"
          id="review"
          className="input"
          style={{ height: 120, resize: "vertical" }}
          placeholder="Write your review here…"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary"
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
      >
        {isSubmitting ? "Saving…" : "▶ Submit Review"}
      </button>
    </Form>
  );
};

export default ReviewForm;
