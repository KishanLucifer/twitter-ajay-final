import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet as TweetType } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Ajay from "./ajay.jpg";
import { useCallback } from 'react';
// import Image from "next/image";




interface Props {
  tweet: TweetType;
}

function TweetComponent({ tweet }: Props) {
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  const { data: session } = useSession();

  const refreshComments = useCallback(async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  }, [tweet._id]);

  useEffect(() => {
    refreshComments();
  }, [refreshComments]);

  // console.log(comments);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();




    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "Ajay.src",
    };

    await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    // console.log("WOOHOO we made it", result);
    toast.success("Comment Posted!", {
      // id: comments,
    });



    setInput("");
    setCommentBoxVisible(false);
    refreshComments();
  }

  return (
    <div
      key={tweet._id}
      className="flex flex-col space-x-3 border-y p-5 border-gray-100"
    >
      <div className="flex space-x-3">
        <img
          className="mt-1 h-10 w-10 rounded-full object-cover"
          src={session?.user?.image || Ajay.src}
          alt=""
        />
        <div>
          <div className="flex items-centre space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()} ·
            </p>

            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sn=m"
              src={tweet.image}
              alt=""
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-black-500"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/* comment box logic */}

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-black-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            disabled={!input}
            className=" rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 scrollbar-hide overflow-y-scroll border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                className="mt-1 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-centre space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()} ·
                  </p>

                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TweetComponent;
