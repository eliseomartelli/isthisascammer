import Link from "next/link";
import React from "react";
import Button from "../components/Button";
import Container from "../components/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col gap-4 w-full h-full align-middle justify-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p>
          We hit a roadblock.
          <br />I couldn&apos;t find the page you were looking for.
        </p>
        <Link href="/" passHref>
          <a>
            <Button>Homepage</Button>
          </a>
        </Link>
      </div>
    </Container>
  );
}
