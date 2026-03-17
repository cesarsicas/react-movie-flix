import { redirect } from "react-router-dom";
import { ADMIN_TOKEN_KEY } from "../../utils/Constants";

export function adminLogoutAction() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  return redirect("/admin/login");
}
