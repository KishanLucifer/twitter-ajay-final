// import Head from 'next/head';
// import Sidebar from '@/components/Sidebar';
// import Feed from '@/components/Feed';
// import Widgets from '@/components/Widgets';
// import type { GetServerSideProps } from 'next';
// import { Tweet } from '../typings';
// import { fetchTweets } from '@/utils/fetchTweets';
// import { Toaster } from 'react-hot-toast';

// interface Props {
//   tweets: Tweet[];
// }

// const Home = ({ tweets }: Props) => {
//   // console.log(tweets);
//   return (
//     <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
//       <Head>
//         <title>Twitter</title>
//       </Head>
//       <Toaster />
//       <main className="grid grid-cols-9 divide-x divide-gray-700">
//         <Sidebar />
//         <Feed tweets={tweets} />
//         <Widgets />
//       </main>
//     </div>
//   );
// };

// export default Home;

// // export const getServerSideProps: GetServerSideProps = async (context) => {
// //   const tweets = await fetchTweets();
// //   return {
// //     props: {
// //       tweets,
// //     },
// //   };
// // };

// export const getServerSideProps: GetServerSideProps = async (_context) => {
//   try {
//     const tweets = await fetchTweets();
//     // Render tweets
//     return {
//       props: {
//         tweets,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching tweets:', error);
//     // Handle the error appropriately
//     return {
//       props: {
//         tweets: [], // You can set an empty array or another appropriate value when an error occurs
//       },
//     };
//   }
// };

// export async function getServerSideProps(context) {
//   const { id } = context.params; // Use `context.params` to get dynamic params
//   const res = await fetch(`https://restcountries.com/v2/name/${id}`); // Using `restcountries.com` as `restcountries.eu` is no longer accessible
//   const countryList = await res.json();
//   const [country] = countryList; // Get first item in array returned from API

//   return { props: { country } };
// }

// const Country = ({ country }) => {
//   console.log(country);

//   return (
//     <>
//       <h1>{country.name}</h1>
//       <span>{country.capital}</span>
//     </>
//   );
// };

// export default Country;

import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import type { GetServerSideProps } from "next";
import { Tweet } from "../typings";
import { fetchTweets } from "@/utils/fetchTweets";
import { Toaster } from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter</title>
      </Head>
      <Toaster />
      <main className="grid grid-cols-9 divide-x divide-gray-700">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (_context) => {
  try {
    console.log("getServerSideProps called");
    const tweets = await fetchTweets();
    console.log("Fetched tweets:", tweets);
    return {
      props: {
        tweets,
      },
    };
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return {
      props: {
        tweets: [],
      },
    };
  }
};
