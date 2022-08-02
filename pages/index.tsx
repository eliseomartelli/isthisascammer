import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { SyntheticEvent } from "react";
import Container from "../components/Container";

const Home: NextPage = () => {
  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
    };
    Router.push(`/check/${target.username.value}`);
  }

  return (
    <>
      <Head>
        <title>Is this a scammer?</title>
        <meta name="description" content="A site made to check if an instagram account is a scammer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex flex-col gap-8">
        <div className="w-full heropattern-polkadots-gray-100 py-8">
          <Container>
            <div className="text-center flex flex-col gap-2">
              <p className="text-xl">
                Check if the Instagram account that is trying to contact you was
                already reported as a scammer.
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
                <input
                  type="submit"
                  className="bg-blue-800 text-white px-4 py-2"
                  value="Check"
                />
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
        <Container>
          <div className="flex flex-col gap-14 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-4">
              <div className="flex flex-col gap-2">
                <h2>Why?</h2>
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
                <h2>Types of scams</h2>
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
              </div>
            </div>

            <div className="flex flex-col gap-2 md:w-1/2 mx-auto">
              <h2>Who am I?</h2>
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
