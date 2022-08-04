import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import Button from "../components/Button";
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
        username: target.username.value,
        token,
      }),
    }).then((res) => {
      if (res.status === 200) {
        router.push(`/check/${target.username.value}`);
      }
    });
  }

  return (
    <div className="w-full bg-gray-200 py-8">
      <Container>
        <div className="flex gap-8 flex-col text-center">
          <p className="text-xl font-medium">Report an account</p>
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
            <div className="flex items-center flex-col">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                onVerify={setToken}
              />
            </div>
            <Button colour="danger" disabled={!token}>
              Report this account
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
