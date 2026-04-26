import { Form, useActionData, useNavigation } from "react-router-dom";

export default function AdminLoginForm() {
  const data = useActionData() as { errors?: string[] } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className="w-full">
        <h1 className="mb-4 text-center text-3xl font-bold">Admin Login</h1>
      </div>

      <div className="flex w-full flex-row justify-center">
        <Form method="post" className="flex w-full flex-col md:w-2/3 lg:w-1/3">
          <div className="mb-4 text-red-500">
            {data && data.errors && (
              <ul>
                {data.errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold">
              Email:
            </label>
            <input
              name="email"
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
              name="password"
              type="password"
              id="password"
              className="w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 mb-2 min-w-[120px] rounded border bg-slate-800 px-6 py-2 text-center text-white hover:bg-slate-700 focus:outline-none"
            >
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
