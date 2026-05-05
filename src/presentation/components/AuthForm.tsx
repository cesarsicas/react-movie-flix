import { Form, Link, useActionData, useNavigation, useSearchParams } from "react-router-dom";

export default function AuthForm() {
  const data = useActionData() as { errors?: string[]; success?: string } | undefined;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      {/* Channel strip header */}
      <div className="channel-strip" style={{ marginBottom: 24 }}>
        <span className="font-crt" style={{ color: "var(--amber)" }}>CH 01</span>
        <span>{isLogin ? "LOGIN" : "SIGN UP"}</span>
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
        {data?.success && (
          <div style={{ marginBottom: 12, padding: "8px 12px", background: "rgba(95,217,217,0.1)", border: "1px solid var(--cyan)" }}>
            <p style={{ color: "var(--cyan)", fontSize: 12 }}>{data.success}</p>
          </div>
        )}

        <Form method="post" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="email"
              className="muted"
              style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="input"
              placeholder="your@email.com"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="password"
              className="muted"
              style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", opacity: isSubmitting ? 0.6 : 1 }}
          >
            {isSubmitting ? "…" : isLogin ? "▶ Login" : "▶ Sign Up"}
          </button>
        </Form>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className="link"
            style={{ fontSize: 12 }}
          >
            {isLogin ? "Create a new account →" : "Already have an account? Login →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
