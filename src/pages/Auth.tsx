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

    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;

    // // optional: Add validation

    // setIsLoading(true);
    // let url;
    // if (isLogin) {
    //   url =
    //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24";
    // } else {
    //   url =
    //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24";
    // }
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //     returnSecureToken: true,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     setIsLoading(false);
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         let errorMessage = "Authentication failed!";
    //         // if (data && data.error && data.error.message) {
    //         //   errorMessage = data.error.message;
    //         // }

    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     const expirationTime = new Date(
    //       new Date().getTime() + +data.expiresIn * 1000,
    //     );
    //     authCtx.login(data.idToken, expirationTime.toISOString());
    //     history.replace("/");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
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
