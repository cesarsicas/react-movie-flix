import { postAdminLogin } from "../../data/api/authApi";
import { ADMIN_TOKEN_KEY } from "../../utils/Constants";

export default async function adminLoginUseCase(
  email: string,
  password: string,
): Promise<{ token: string }> {
  const data = await postAdminLogin(email, password);
  localStorage.setItem(ADMIN_TOKEN_KEY, data.response.tokenJWT);
  return { token: data.response.tokenJWT };
}
