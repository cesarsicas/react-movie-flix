import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

export default function AppHeader() {
  return (
    <header className="grid grid-cols-3 gap-4 px-16 py-4 items-center">
      <h1 className="text-2xl">
        <FontAwesomeIcon icon={faVideo} /> ReactFlix
      </h1>
      <div className="">
        <input
          type="text"
          placeholder="Search movies and tv series..."
          className="w-full p-2 bg-gray-100  rounded-md  border  border-gray-100 focus:outline-none focus:border-gray-500 transition-colors"
        />
      </div>
      <div className="flex w-full justify-end items-center">

          <a className="px-6 py-2 min-w-[120px] text-center border rounded hover:bg-gray-300 focus:outline-none border-none"
              href="#">
              Login
          </a>

          <a className="mx-5 px-6 py-2 min-w-[120px] text-center text-white bg-slate-800 border rounded focus:outline-none"
              href="#">
              Signup
          </a>

          
      </div>
    </header>
  );
}
