import { NextApiRequest, NextApiResponse } from "next";
import getImage from "../../helpers/getImage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const img = await getImage(13, true); // tests per million
  res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
  res.end(img);
};
