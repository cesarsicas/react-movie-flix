export function getAuthToken(): string {
  const token = localStorage.getItem("token");
  return token ?? ""; //todo call this function for every call that needs auth
}

export function tokenLoader() {
  return getAuthToken();
}
