import { Form, useActionData, useNavigation } from "react-router-dom";

export default function AdminLoginForm() {
  const data = useActionData() as { errors?: string[] } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <div className="channel-strip" style={{ marginBottom: 24 }}>
        <span className="font-crt" style={{ color: "var(--amber)" }}>ADM</span>
        <span>ADMIN LOGIN</span>
        <span />
      </div>

      <div className="dashed-box">
        {data?.errors && (
          <div style={{ marginBottom: 12, padding: "8px 12px", background: "rgba(200,54,45,0.15)", border: "1px solid var(--red)" }}>
            {data.errors.map((err) => (
              <p key={err} style={{ color: "var(--red)", fontSize: 12 }}>{err}</p>
            ))}
          </div>
        )}

        <Form method="post" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="email" className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Email
            </label>
            <input name="email" type="email" id="email" className="input" placeholder="admin@email.com" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="password" className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Password
            </label>
            <input name="password" type="password" id="password" className="input" placeholder="••••••••" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", opacity: isSubmitting ? 0.6 : 1 }}
          >
            {isSubmitting ? "…" : "▶ Login"}
          </button>
        </Form>
      </div>
    </div>
  );
}
