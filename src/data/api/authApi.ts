import { API_BASE_URL } from "../../utils/Constants";
import type { LoginResponse } from "../model/LoginResponse";

export async function postLogin(
  email: string,
  password: string,
): Promise<{
  response: LoginResponse;
}> {
  const response = await fetch(API_BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: email, password: password, role: "DEFAULT" }),
  });

  if (!response.ok) {
    throw new Error("Could not authenticate user");
  }

  const data = (await response.json()) as LoginResponse;
  return { response: data };
}

export async function postSignUp(
  email: string,
  password: string,
): Promise<void> {
  const response = await fetch(API_BASE_URL + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: email, password: password, role: "DEFAULT" }),
  });

  if (!response.ok) {
    throw new Error("Could not authenticate user");
  }
}
