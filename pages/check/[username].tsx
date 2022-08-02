import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
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
      <Container>
        <>Loading...</>
      </Container>
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
    <div className="w-full">
      <div className="w-full heropattern-polkadots-gray-100 py-8 text-center flex align-middle">
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
    </div>
  );
}
