// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyHcaptchaToken } from "verify-hcaptcha";
import clientPromise from "../../lib/mongodb";

type Data = {
  status: string;
  error?: string | string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ status: "Method not allowed" });
    return;
  }

  const { username, token } = req.body;

  if (!username || !token) {
    res.status(400).json({ status: "Bad request" });
    return;
  }

  let cleanUsername = username!.toLowerCase().replace("@", "");

  const status = await verifyHcaptchaToken({
    siteKey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
    secretKey: process.env.HCAPTCHA_SECRET!,
    token,
  });

  if (status.success) {
    await (
      await clientPromise
    )
      .db()
      .collection("users")
      .insertOne({
        username: cleanUsername,
      })
      .then(() => {
        res.status(200).json({ status: "OK" });
      })
      .catch(() => {
        res.status(500).json({ status: "server error" });
      });
    return;
  }

  res.status(400).json({ status: "Not auth" });
  return;
}
