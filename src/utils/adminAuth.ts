import { redirect } from "react-router-dom";
import { ADMIN_TOKEN_KEY } from "./Constants";

export function getAdminToken(): string {
  return localStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
}

export function adminTokenLoader() {
  return getAdminToken();
}

export function adminRootLoader() {
  const token = getAdminToken();
  if (token) {
    return redirect("/admin/home");
  }
  return redirect("/admin/login");
}

export function checkAdminAuthLoader() {
  const token = getAdminToken();
  if (!token) {
    return redirect("/admin/login");
  }
  return null;
}
