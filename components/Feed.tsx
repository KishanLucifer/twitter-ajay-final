import { RefreshIcon } from '@heroicons/react/outline';
import TweetBox from './TweetBox';
import { Tweet } from '../typings';
import TweetComponent from '../components/Tweet';
import { fetchTweets } from '@/utils/fetchTweets';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetsProps }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProps);

  const handleRefresh = async () => {
    const RefreshToast = toast.loading('Refreshing...');

    const tweets = await fetchTweets();
    toast.success('Feeds Updated!', {
      id: RefreshToast,
    });

    setTweets(tweets);
  };

  return (
    <div className="col-span-7 max-h-screen overflow-scroll divide-y divide-gray-700 scrollbar-hide lg:col-span-5 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="p-5 pb-0 text-xl text-ce font-bold ">For You</h1>
        </div>
        <div>
          <h1 className="p-5 pb-0 text-xl text-ce font-bold ">Following</h1>
        </div>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <div>
        <TweetBox setTweets={setTweets} />
      </div>
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
