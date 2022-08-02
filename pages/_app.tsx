import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "../components/Container";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full flex flex-col grow min-h-screen">
      <header className="bg-white shadow-md py-4">
        <Container>
          <Link href="/">
            <p>Is this a scammer?</p>
          </Link>
        </Container>
      </header>
      <main className="flex min-h-screen">
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-300 py-4">
        <Container>
          <p>© {new Date().getFullYear()} - Eliseo Martelli</p>
        </Container>
      </footer>
    </div>
  );
}

export default MyApp;
