// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verify } from "hcaptcha";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return;
  }

  console.log(req);

  const { username, token } = req.body;

  if (!username || !token) {
    return;
  }

  const { success } = await verify(process.env.HCAPTCHA_SECRET!, token);

  console.log(username, token, success);

  if (success) {
    const user = await (await clientPromise)
      .db()
      .collection("users")
      .insertOne({
        username,
      });
    res.status(200).json({ status: "OK" });
  }

  res.status(400).json({ status: "Not auth" });
}