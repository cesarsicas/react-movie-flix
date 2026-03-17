import { Outlet } from "react-router-dom";
import AdminToolbar from "../components/AdminToolbar";

export default function AdminLayout() {
  return (
    <>
      <AdminToolbar />
      <Outlet />
    </>
  );
}
