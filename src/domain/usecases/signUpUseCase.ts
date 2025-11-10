import { postSignUp } from "../../data/api/authApi";

export default async function signUpUseCase(
  email: string,
  password: string,
): Promise<void> {
  postSignUp(email, password);
}
