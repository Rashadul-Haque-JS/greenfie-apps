import { NextPageContext } from "next";
import Head from "next/head";

type ErrorProps = {
  statusCode: number;
  errorMessage?: string;
};

const Error = ({ statusCode, errorMessage }: ErrorProps) => {
  return (
    <>
      <Head>
        <title>Error {statusCode}</title>
      </Head>
      <div className="container">
        <h1>Error {statusCode}</h1>
        <p>{errorMessage ? errorMessage : "Sorry, an error occurred on the server."}</p>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, err, query }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  const errorMessage = query?.errorMessage as string;
  return { statusCode, errorMessage };
};

export default Error;
