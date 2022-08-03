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
            <p className="font-medium">Is this a scammer?</p>
          </Link>
        </Container>
      </header>
      <main className="flex flex-auto">
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-300 py-4">
        <Container>
          <div className="flex flex-col gap-4">
            <p>© {new Date().getFullYear()} - Eliseo Martelli</p>
            <p className="font-light italic">
              The use of any trade name or trademark is for identification and
              reference purposes only and does not imply any association with
              the trademark holder of their product brand.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default MyApp;
