// import { Tweet } from "../typings";

// export const fetchTweets = async () => {
//   const res = await fetch(
//     ` ${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets `
//   );
//   const data = await res.json();
//   const tweets: Tweet[] = data.tweets;
//   return tweets;
// };

import { Tweet } from "../typings";
import { revalidatePath } from 'next/cache'


export const fetchTweets = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();
    revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`)

    
    const tweets: Tweet[] = data.tweets;
    return tweets;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error; // You can re-throw the error or handle it as needed.
  }
};
