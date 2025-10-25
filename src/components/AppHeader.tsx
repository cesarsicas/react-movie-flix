import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className="grid items-center gap-4 px-16 py-4 md:grid-cols-1 lg:grid-cols-3">
      <Link to={`/`}>
        <h1 className="text-2xl">
          <FontAwesomeIcon icon={faVideo} /> ReactFlix
        </h1>
      </Link>
      <div className="">
        <input
          type="text"
          placeholder="Search movies and tv series..."
          className="w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
        />
      </div>
      <div className="flex w-full items-center justify-end">
        <Link
          to={`/auth?mode=login`}
          className="min-w-[120px] rounded border border-none px-6 py-2 text-center hover:bg-gray-300 focus:outline-none"
        >
          Login
        </Link>

        <Link
          to={`/auth?mode=signup`}
          className="mx-5 min-w-[120px] rounded border bg-slate-800 px-6 py-2 text-center text-white hover:bg-slate-700 focus:outline-none"
        >
          Signup
        </Link>
      </div>
    </header>
  );
}
