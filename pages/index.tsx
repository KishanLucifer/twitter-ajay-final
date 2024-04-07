import Head from 'next/head';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import Widgets from '@/components/Widgets';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { Tweet } from '@/typings';
import { fetchTweets } from '@/utils/fetchTweets';
import { Toaster } from 'react-hot-toast';

interface Props {
  tweets: Tweet[];
}

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ tweets }) => {
  console.log(tweets);
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter</title>
      </Head>
      <Toaster />
      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    },
  };
};
// import Head from "next/head";
// import Sidebar from "@/components/Sidebar";
// import Feed from "@/components/Feed";
// import Widgets from "@/components/Widgets";
// // import type { GetServerSideProps } from "next";
// import { Tweet } from "@/typings";
// import { fetchTweets } from "@/utils/fetchTweets";
// import { Toaster } from "react-hot-toast";
// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

// interface Props {
//   tweets: Tweet[];
// }

// const Home = ({ tweets }: Props) => {
//   console.log(tweets);
//   return (
//     <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
//       <Head>
//         <title>Twitter</title>
//       </Head>
//       <Toaster />
//       <main className="grid grid-cols-9">
//         <Sidebar />
//         <Feed tweets={tweets} />
//         <Widgets />
//       </main>
//     </div>
//   );
// };

// export default Home;

// export const getServerSideProps: GetServerSideProps = async (_context) => {
//   const tweets = await fetchTweets();
//   return {
//     props: {
//       tweets,
//     },
//   };
// };

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
//     console.error("Error fetching tweets:", error);
//     // Handle the error appropriately
//     return {
//       props: {
//         tweets: [], // You can set an empty array or another appropriate value when an error occurs
//       },
//     };
//   }
// };
