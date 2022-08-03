// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

type Data = {
  result: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userCount = (
    await (await clientPromise).db().collection("users").distinct("username")
  ).length;

  res.status(200).json({ result: Math.ceil(userCount / 100) * 100 });
}
