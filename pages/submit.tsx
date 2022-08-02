import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import Container from "../components/Container";

export default function Submit() {
  const [token, setToken] = useState<string | null>();

  const router = useRouter();
  const { username } = router.query;

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
    };
    fetch(`/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        token,
      }),
    }).then((res) => {
      if (res.status === 200) {
        router.push(`/check/${username}`);
      }
    });
  }

  return (
    <div className="w-full mt-4">
      <Container>
        <div className="flex gap-8 flex-col">
          <h1 className="text-2xl font-bold">Report an account</h1>
          <form
            className="max-w-3xl w-full flex flex-col mx-auto gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Instagram username"
              className="px-4 py-2 rounded-lg shadow-lg"
              name="username"
              defaultValue={username}
            />
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
              onVerify={setToken}
            />
            <input
              type="submit"
              className="bg-red-800 py-2 px-4 text-white font-bold rounded-md shadow-md"
              value="Report this account"
              hidden={!token}
            />
          </form>
        </div>
      </Container>
    </div>
  );
}
