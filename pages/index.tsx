import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Is this a scammer?</title>
        <meta
          name="description"
          content="A site made to check if an instagram account is a scammer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex flex-col gap-8">
        <div>
          <CheckForm />
          <Stats />
        </div>
        <Container>
          <div className="flex flex-col gap-14 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2>Why?</h2>
                </div>
                <p>
                  Getting scammed is a big hit on what we think of ourself.
                  <br />
                  Hearing stories from the Instagram community and seeing that
                  Meta is not responding in any way to this problem,
                  <br /> I decided to launch this service.
                  <br />
                  From an Instagram user, for Instagram users.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h2>Types of scams</h2>
                </div>
                <p>
                  There are different types of scams on Instagram. The most
                  commons are:
                </p>
                <ul className="list-disc mx-8">
                  <li>Phishing scams</li>
                  <li>Romance scams</li>
                  <li>Lottery scams</li>
                  <li>Loan scams</li>
                  <li>Investment scams</li>
                  <li>Job scams</li>
                </ul>
                <a
                  href="https://help.instagram.com/514187739359208"
                  className="text-blue-800 underline"
                >
                  Learn how to be safe on Instagram.
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:w-1/2 mx-auto">
              <div className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2>Who am I?</h2>
              </div>
              <p>
                My name is{" "}
                <a
                  href="https://eliseomartelli.it"
                  className="text-blue-800 underline"
                >
                  Eliseo Martelli
                </a>
                . I&apos;m a computer science student in Italy, I also love
                photography and use{" "}
                <a
                  href="https://instagram.com/eliseomartelli"
                  className="text-blue-800 underline"
                >
                  Instagram
                </a>{" "}
                on a daily basis and I care about having an healthy community
                around me.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;

const CheckForm = () => {
  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
    };
    Router.push(`/check/${target.username.value}`);
  }

  return (
    <div className="w-full py-8 bg-gray-100">
      <Container>
        <div className="text-center flex flex-col gap-4">
          <p className="text-xl font-medium">
            Check if who&apos;s contacting you has been reported as a scammer
          </p>
          <form
            className="mt-4 shadow-lg rounded-lg overflow-hidden flex flex-row max-w-3xl w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Instagram username"
              className="px-4 py-2 grow"
              name="username"
            />
            <Button>Check</Button>
          </form>
          <p className="italic">- or -</p>
          <Link href="/submit" passHref>
            <a className="text-blue-800 underline hover:text-purple-900">
              Submit a new account
            </a>
          </Link>
        </div>
      </Container>
    </div>
  );
};

const Stats = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats").then(async (res) => {
      const { result } = (await res.json()) as typeof res.json & {
        result: number;
      };
      setCount(result);
    });
  });

  return (
    <div className="bg-gray-700 text-white py-4">
      <Container>
        <div className="flex align-middle justify-center">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            <div className="flex flex-col">
              <h1 className="font-bold text-2xl">~ {count}</h1>
              <p>Accounts reported</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
