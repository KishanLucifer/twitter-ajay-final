import React from 'react';
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline';
import Logo from './tw.jpg';
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';
import Ajay from './ajay.jpg';
import { Comment, CommentBody, Tweet as TweetType } from '../typings';

interface Props {
  tweet: TweetType;
}

function Sidebar() {
  const { data: session } = useSession();
  const comment: CommentBody = {
    username: session?.user?.name || 'Unknown User',
    profileImg: session?.user?.image || 'Ajay.src',
    comment: '',
    tweetId: '',
  };

  return (
    <>
      <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
        <img className="m-3 h-10 w-10" src={Logo.src} alt="" />
        <SidebarRow Icon={HomeIcon} title="Home" />
        <SidebarRow Icon={HashtagIcon} title="Explore" />
        <SidebarRow Icon={BellIcon} title="Notifications" />
        <SidebarRow Icon={MailIcon} title="Messages" />
        {/* <SidebarRow Icon={MailIcon} title="Grok" /> */}
        <SidebarRow Icon={CollectionIcon} title="Lists" />
        {/* <SidebarRow Icon={MailIcon} title="Premium" /> */}
        <SidebarRow Icon={MailIcon} title="Profile" />
        <SidebarRow Icon={MailIcon} title="More" />
        <SidebarRow
          onClick={session ? signOut : signIn}
          Icon={UserIcon}
          title={session ? 'Sign Out' : 'Sign In'}
        />
        <button className="hidden md:block bg-[#1d9bf0] px-20 my-4 text-xl rounded-full py-3 text-white">
          Post
        </button>

        <div className="item p-3 items-center gap-5 justify-end flex hover:bg-gray-800 cursor-pointer rounded-full w-fit">
          <img
            className="mt-4 h-12 w-12 rounded-full object-cover"
            src={session?.user?.image || Ajay.src}
            alt="User Profile Image"
          />

          <div className=" p2">
            <div>{comment.username}</div>
            <div className="text-gray-500">
              @{comment.username.replace(/\s+/g, '').toLowerCase()}{' '}
            </div>
          </div>
          <div className="p3 text-2xl">...</div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
