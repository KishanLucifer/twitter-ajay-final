import { Tweet } from "../typings";

export const fetchTweets = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch tweets: HTTP status ${res.status}`);
    }

    const data = await res.json();
    const tweets: Tweet[] = data.tweets;
    return tweets;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return []; // or handle the error in a way that makes sense for your application
  }
};
