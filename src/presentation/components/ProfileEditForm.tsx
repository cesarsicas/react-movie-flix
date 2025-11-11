import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

export default function ProfileEditForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <div className="w-full">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Edit your profile
        </h1>
      </div>

      <div className="flex w-full flex-row justify-center">
        <Form method="post" className="flex w-full flex-col md:w-2/3 lg:w-1/3">
          <div className="mb-4 text-red-500">
            {data && data.errors && (
              <ul>
                {Object.values(data.errors).map((err) => (
                  <li key={err as string}>{err as string}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4 text-green-500">
            {data && data.success && <p>{data.success as string}</p>}
          </div>

          <div className="mb-3 flex flex-col">
            <label htmlFor="name" className="mb-2 font-semibold">
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              className="w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio" className="mb-2 font-semibold">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              className="h-[150px] w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
              placeholder="Enter a description about you"
            />

            {!isSubmitting && (
              <button
                type="submit"
                className="mt-4 mb-2 min-w-[120px] rounded border bg-slate-800 px-6 py-2 text-center text-white hover:bg-slate-700 focus:outline-none"
              >
                {isSubmitting ? "Submitting..." : "Send"}
              </button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
}
