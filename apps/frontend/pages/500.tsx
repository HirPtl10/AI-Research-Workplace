export default function ServerError() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">500</h1>
  
        <p className="mt-4 text-xl">
          Internal Server Error
        </p>
  
        <a
          href="/"
          className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
        >
          Go Home
        </a>
      </div>
    );
  }