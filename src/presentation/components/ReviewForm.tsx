import { Form, useActionData, useNavigation } from "react-router-dom";

export default function ReviewForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className="w-full">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Give your review!
        </h1>
      </div>

      <div className="flex w-full flex-row justify-center">
        <Form method="post" className="flex w-full flex-col">
          <div className="mb-4 text-red-500">
            {data && data.errors && (
              <ul>
                {Object.values(data.errors).map((err) => (
                  <li key={err as string}>{err as string}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col">
            <textarea
              name="review"
              id="review"
              className="h-[150px] w-full rounded-md border border-gray-100 bg-gray-100 p-2 transition-colors focus:border-gray-500 focus:outline-none"
              placeholder="Enter your review"
            />
          </div>
          <div className="text-center">
            {!isSubmitting && (
              <button
                type="submit"
                className="mt-4 mb-2 min-w-[120px] rounded border bg-slate-800 px-6 py-2 text-center text-white hover:bg-slate-700 focus:outline-none"
              >
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
}
