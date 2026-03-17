import { redirect, type ActionFunctionArgs } from "react-router-dom";
import AdminLoginForm from "../components/AdminLoginForm";
import PageContainer from "../components/PageContainer";
import adminLoginUseCase from "../../domain/usecases/adminLoginUseCase";

export function AdminLogin() {
  return (
    <PageContainer>
      <AdminLoginForm />
    </PageContainer>
  );
}

export async function adminLoginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await adminLoginUseCase(email, password);
    return redirect("/admin/home");
  } catch {
    return { errors: ["Could not authenticate admin user"] };
  }
}
