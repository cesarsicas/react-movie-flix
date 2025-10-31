import { redirect } from "react-router-dom";

export function getAuthToken(): string {
  const token = localStorage.getItem("token");
  return token ?? ""; //todo call this function for every call that needs auth
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }
}
