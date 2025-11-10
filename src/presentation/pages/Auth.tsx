import { redirect, type ActionFunctionArgs } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import PageContainer from "../components/PageContainer";
import loginUseCase from "../../domain/usecases/loginUseCase";
import signUpUseCase from "../../domain/usecases/signUpUseCase";

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
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (mode == "signup") {
    try {
      signUpUseCase(email, password);
      return { success: "User created with success!" };
    } catch (error) {
      return { errors: ["Could not register user"] };
    }
  } else {
    try {
      await loginUseCase(email, password);
      return redirect("/profile");
    } catch (error) {
      return { errors: ["Could not authenticate user"] };
    }
  }
}
