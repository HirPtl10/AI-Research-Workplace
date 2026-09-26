function Error({ statusCode }: { statusCode?: number }) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">
          {statusCode || 500}
        </h1>
  
        <p className="mt-4 text-xl">
          Something went wrong
        </p>
      </div>
    );
  }
  
  Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  
    return { statusCode };
  };
  
  export default Error;