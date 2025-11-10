import { postLogin } from "../../data/api/authApi";
import { TOKEN_KEY } from "../../utils/Constants";

export default async function loginUseCase(
  email: string,
  password: string,
): Promise<{ token: string }> {
  const data = await postLogin(email, password);

  localStorage.setItem(TOKEN_KEY, data.response.tokenJWT);

  return { token: data.response.tokenJWT };
}
