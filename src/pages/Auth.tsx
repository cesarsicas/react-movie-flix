import { useState } from "react";
import PageContainer from "../components/PageContainer";
import {
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

export function Auth() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const submitHandler = (event: any) => {
    event.preventDefault();

    console.log("Submitted!");
  };

  return (
    <PageContainer>
      <h1 className="mb-4 w-full text-center text-3xl font-bold">
        {isLogin ? "Login" : "Signup"}
      </h1>
      <div className="flex w-full flex-row justify-center">
        <form
          onSubmit={submitHandler}
          className="flex w-full flex-col md:w-2/3 lg:w-1/3"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
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

            {!isSubmitting && (
              <button className="mt-4 mb-2 min-w-[120px] rounded border bg-slate-800 px-6 py-2 text-center text-white hover:bg-slate-700 focus:outline-none">
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
            )}

            <Link
              to={`?mode=${isLogin ? "signup" : "login"}`}
              className="text-center"
            >
              {isLogin ? "Create new user" : "Login"}
            </Link>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
