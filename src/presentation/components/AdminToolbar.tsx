import { Form, Link, useRouteLoaderData } from "react-router-dom";

export default function AdminToolbar() {
  const tokenData = useRouteLoaderData("admin-root");

  return (
    <header className="flex items-center justify-between px-16 py-4 bg-slate-800 text-white">
      <div className="flex items-center gap-8">
        <Link to="/admin/home">
          <h1 className="text-2xl font-bold">ReactFlix Admin</h1>
        </Link>
        {tokenData && (
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/admin/watch-party" className="hover:text-slate-300">
              Watch Party
            </Link>
          </nav>
        )}
      </div>
      {tokenData && (
        <Form action="/admin/logout" method="post">
          <button className="min-w-[120px] rounded border border-white px-6 py-2 text-center hover:bg-slate-700 focus:outline-none">
            Logout
          </button>
        </Form>
      )}
    </header>
  );
}
