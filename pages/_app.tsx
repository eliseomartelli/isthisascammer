import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "../components/Container";
import Link from "next/link";
import Image from "next/image";
import FullSection from "../components/FullSection";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full flex flex-col grow min-h-screen">
      <Toolbar />
      <main className="flex flex-auto">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

function Toolbar() {
  return (
    <header className="bg-white shadow-md py-4">
      <Container>
        <Link href="/" passHref>
          <a>
            <div className="flex items-center gap-2">
              <Image src="/icon.png" width={32} height={32} alt="Logo" />
              <p className="font-medium">Is this a scammer?</p>
            </div>
          </a>
        </Link>
      </Container>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <FullSection className="bg-gray-300 py-4">
        <Container>
          <div className="flex flex-col gap-4">
            <p>© {new Date().getFullYear()} - Eliseo Martelli</p>
            <a href="https://github.com/eliseomartelli/isthisascammer">
              GitHub
            </a>
            <p className="font-light italic">
              The use of any trade name or trademark is for identification and
              reference purposes only and does not imply any association with
              the trademark holder of their product brand.
            </p>
          </div>
        </Container>
      </FullSection>
    </footer>
  );
}

export default MyApp;
