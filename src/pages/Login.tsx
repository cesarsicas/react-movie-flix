import PageContainer from "../components/PageContainer";

export function Login() {
  return (
    <PageContainer>
      <h1 className="mb-4 text-3xl font-bold">Login</h1>

      <div className="flex w-full flex-row justify-center">
        <form className="flex w-full flex-col md:w-2/3 lg:w-1/3">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              //className="rounded border border-gray-300 p-2"
              className="w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              className="mt-4 min-w-[120px] rounded border bg-slate-800 px-6 py-2 text-center text-white hover:bg-slate-700 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
