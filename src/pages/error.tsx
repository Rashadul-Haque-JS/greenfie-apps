import { NextPageContext } from "next";
import Link from "next/link";

type ErrorProps = {
  statusCode: number;
  errorMessage?: string;
};

const Error = ({ statusCode, errorMessage }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <title>Error {statusCode}</title>
      <div className="flex items-center">
        <div className="h-full md:border-l-2 lg:border-l-2 xl:border-l-2 border-gray-200 md:pl-8 md:ml-8 lg:pl-8 lg:ml-8 xl:pl-8 xl:ml-8">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Error {statusCode}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {errorMessage
              ? errorMessage
              : "Sorry, an error occurred on the server."}
          </p>
          <Link
            href="/"
            className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
        <div className="flex-grow"></div>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err, query }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  const errorMessage = query?.errorMessage as string;
  return { statusCode, errorMessage };
};

export default Error;
