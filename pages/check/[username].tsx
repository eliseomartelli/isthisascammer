import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Button from "../../components/Button";
import Container from "../../components/Container";

export default function Check() {
  const router = useRouter();
  const { username } = router.query;

  const address = `/api/check/${username}`;
  const fetcher = async (url: string) =>
    await fetch(url).then((res) => res.json());
  const { data, error } = useSWR(address, fetcher);

  if (!data) {
    return (
      <div className="w-full">
        <div className="w-full bg-gray-100 py-8 text-center flex align-middle">
          <Container>
            <div className="flex flex-col align-middle justify-center gap-2">
              <div className="w-full flex justify-center">
                <div className="w-24 h-24 block bg-gray-300 animate-pulse"></div>
              </div>
              <p className="block self-center w-44 h-8 bg-gray-300 animate-pulse"></p>
              <h3 className="w-32 self-center h-10 bg-gray-300 animate-pulse"></h3>
              <p className="w-56 bg-gray-300 animate-pulse block h-8 self-center"></p>
              <div className="mt-6 justify-center flex">
                <div className="block w-56 rounded-md bg-gray-300 h-10 shadow-lg animate-pulse self-center"></div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <>Error retriving data, try later.</>
      </Container>
    );
  }

  const isSafe = data.result > 0 ? "dangerous" : "safe";

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full bg-gray-100 py-8 text-center flex align-middle">
        <Container>
          <div className="flex flex-col align-middle justify-center gap-2">
            <div className="w-full flex justify-center">
              {data.result == 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="green"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="orange"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                  />
                </svg>
              )}
            </div>
            <p>The account</p>
            <h3 className="text-2xl font-bold">{username}</h3>
            <p>
              received <span>{data.result}</span> reports, so it might be{" "}
              {isSafe}.
            </p>
            <div className="mt-6">
              <Link href={`/submit?username=${username}`} passHref>
                <a className="bg-red-800 py-2 px-4 text-white font-bold rounded-md shadow-md">
                  Report this account
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex justify-center gap-2 flex-col text-center">
          <a href="https://help.instagram.com/514187739359208">
            <Button colour="secondary">
              Learn how to be safe on Instagram
            </Button>
          </a>
          <p>or</p>
          <Link href="/" passHref>
            <a>
              <Button>Check another account</Button>
            </a>
          </Link>
        </div>
      </Container>
    </div>
  );
}
