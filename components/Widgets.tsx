import { SearchIcon } from '@heroicons/react/outline';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import React from 'react';

function Widgets() {
  return (
    <>
      <div className="col-span-2 mt-1 px-2 hidden lg:inline">
        <div className="mt-2 flex bg-opacity-20 items-centre space-x-2 rounded-full bg-gray-400 p-3">
          <SearchIcon className="h-5 w-5 text-400" />
          <input
            className="flex-1 bg-transparent outline-none"
            type="text"
            placeholder="Search Twitter"
          />
        </div>
        <div className="my-3 space-x-3 rounded-full bg-gray-50">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="elonmusk"
            options={{ height: 500 }}
          />
        </div>
      </div>
    </>
  );
}

export default Widgets;
