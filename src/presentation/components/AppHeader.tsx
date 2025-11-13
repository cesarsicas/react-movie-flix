import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";

export default function AppHeader() {
  const tokenData = useRouteLoaderData("root");
  return (
    <header className="grid items-center gap-4 px-16 py-4 md:grid-cols-1 lg:grid-cols-3">
      <Link to={`/`}>
        <h1 className="text-2xl">
          <FontAwesomeIcon icon={faVideo} /> ReactFlix
        </h1>
      </Link>
      <div className="">
        <Form action="/title/search/" method="get">
          <input
            type="text"
            name="query"
            placeholder="Search movies and tv series..."
            className="w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
          />
        </Form>
      </div>
      <div className="flex w-full items-center justify-end">
        {tokenData ? (
          <>
            <div>
              <Form action="/logout" method="post">
                <button className="min-w-[120px] rounded border border-none px-6 py-2 text-center hover:bg-gray-300 focus:outline-none">
                  Logout
                </button>
              </Form>
            </div>
            <Link to={`/profile`} className="">
              <UserAvatar />
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`/auth?mode=login`}
              className="min-w-[120px] rounded border border-none px-6 py-2 text-center hover:bg-gray-300 focus:outline-none"
            >
              Login
            </Link>

            <Link
              to={`/auth?mode=signup`}
              className="min-w-[120px] rounded border border-none px-6 py-2 text-center hover:bg-gray-300 focus:outline-none"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
