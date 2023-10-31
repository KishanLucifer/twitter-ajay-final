// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import { groq } from "next-sanity";
// import { Tweet } from "@/typings";
// import { sanityClient } from "../../sanity";

// const feedQuery = groq`
//     *[_type == "tweet" && !blockTweet] {
//         _id,
//         ...
//     } | order(_createdAt desc)`;

// type Data = {
//   tweets: Tweet[];
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
//   console.log(tweets);
//   res.status(200).json({ tweets });
// }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { Tweet } from "@/typings";
import { sanityClient } from "../../sanity";

const feedQuery = groq`
    *[_type == "tweet" && !blockTweet] {
        _id,
        ...
    } | order(_createdAt desc)`;

type Data = {
  tweets: Tweet[];
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const tweets: Tweet[] = await sanityClient.fetch(feedQuery);

    // Use revalidate function to control caching behavior
    res.setHeader('Cache-Control', 's-maxage=60'); // Adjust the caching duration as needed (e.g., 60 seconds)
    
    res.status(200).json({ tweets });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" } as ErrorResponse);
  }
}
