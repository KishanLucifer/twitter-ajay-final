import { Tweet } from "../typings";

export const fetchTweets = async () => {
  console.log("Fetching tweets...");
  const res = await fetch(
    ` ${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets `,
    {
      headers: {
        "Cache-Control": "no-cache",
      }, // Force fetching new data
    }
  );
  const data = await res.json();
  const tweets: Tweet[] = data.tweets;
  return tweets;
};

// export const fetchTweets = async () => {
//   const API_ENDPOINT = "https://api.example.com/tweets";
//   try {
//     const response = await fetch(API_ENDPOINT, {
//       method: "GET",
//       headers: {
//         "Cache-Control": "no-cache", // Force fetching new data
//       },
//     });

//     if (response.status === 304) {
//       console.log("Data not modified. Using cached data.");
//       // Handle using cached data if available
//       // Return or fetch cached data here if necessary
//     }

//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.statusText}`);
//     }

//     const tweets = await response.json();
//     return tweets;
//   } catch (error) {
//     console.error("Failed to fetch tweets:", error);
//     throw error;
//   }
// };
