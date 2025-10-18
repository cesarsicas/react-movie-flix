import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

export default function AppHeader() {
  return (
    <header className="grid grid-cols-3 items-center gap-4 px-16 py-4">
      <h1 className="text-2xl">
        <FontAwesomeIcon icon={faVideo} /> ReactFlix
      </h1>
      <div className="">
        <input
          type="text"
          placeholder="Search movies and tv series..."
          className="w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
        />
      </div>
      <div className="flex w-full items-center justify-end">
        <a
          className="min-w-[120px] rounded border border-none px-6 py-2 text-center hover:bg-gray-300 focus:outline-none"
          href="#"
        >
          Login
        </a>

        <a
          className="mx-5 min-w-[120px] rounded border bg-slate-800 px-6 py-2 text-center text-white focus:outline-none"
          href="#"
        >
          Signup
        </a>
      </div>
    </header>
  );
}
