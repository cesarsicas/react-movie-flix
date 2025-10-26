import { redirect, type ActionFunctionArgs } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import PageContainer from "../components/PageContainer";

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

  // return { errors: ["Error example"] };

  // const response = await fetch("https://your-backend-api.com/auth/" + mode, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email, password }),
  // });

  // if (response.status === 422 || response.status === 401) {
  //   return response;
  // }

  // if (!response.ok) {
  //   throw new Error("Could not authenticate user.");
  // }

  //TODO implement backend and save returned token

  localStorage.setItem("token", "123456");
  return redirect("/profile");
}
