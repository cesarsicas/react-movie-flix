import { redirect, type ActionFunctionArgs } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import PageContainer from "../components/PageContainer";
import { API_BASE_URL } from "../utils/Constants";
import type { LoginResponse } from "../model/data/LoginResponse";

export function Auth() {
  return (
    <PageContainer>
      <AuthForm />
    </PageContainer>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("Auth form action called");

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw new Error("Unsupported mode");
  }

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(API_BASE_URL + "/auth/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: email, password: password, role: "DEFAULT" }),
  });

  console.log(response);

  let authErrorMessage = "Could not authenticate user";

  if (mode == "signup") {
    authErrorMessage = "Could not register user";
  }

  if (!response.ok) {
    return { errors: [authErrorMessage] };
  }

  if (mode == "signup") {
    return { success: "User created with success!" };
  }

  const data = (await response.json()) as LoginResponse;

  localStorage.setItem("token", data.tokenJWT);
  return redirect("/profile");
}
