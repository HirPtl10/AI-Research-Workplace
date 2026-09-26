export default function ErrorPage({
    statusCode,
    message,
  }: {
    statusCode: number;
    message: string;
  }) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">{statusCode}</h1>
  
        <p className="mt-4 text-gray-500">{message}</p>
  
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }