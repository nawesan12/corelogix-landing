export default function Newsletter() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-center">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Sign up for our newsletter
          </h2>

          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            doloremque saepe architecto maiores repudiandae amet perferendis
            repellendus, reprehenderit voluptas sequi.
          </p>
        </div>

        <form
          action="#"
          className="mx-auto mt-6 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
        >
          <label htmlFor="Email" className="flex-1">
            <span className="sr-only">Email</span>
            <input
              type="email"
              id="Email"
              placeholder="Enter your email"
              className="h-12 w-full rounded border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
            />
          </label>

          <button
            type="submit"
            className="h-12 rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
