import React, { useEffect, useState } from "react";
import { UserDetails } from "../types/user";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export default function ChatLists({ authUser }: { authUser: UserDetails }) {
  const [chatLists, setChatLists] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", authUser.uid), (doc) => {
      setChatLists(doc.data() as DocumentData[]);
    });

    return () => {
      unsub();
    };
  }, [authUser.uid]);

  return (
    <div className="mt-5">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Active Conversations</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {Object.entries(chatLists)?.length}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {Object.entries(chatLists)?.map((chatList) => (
          <button
            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            key={chatList[0]}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${chatList[1]?.userInfo?.displayName}`}
              alt={chatList[1]?.userInfo?.displayName}
              className="flex items-center justify-center bg-primary-200 rounded-full h-8 w-8"
            />
            <div className="ml-2 text-sm font-semibold">
              {chatList[1]?.userInfo?.displayName}
            </div>
            {/* <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
              2
            </div> */}
          </button>
        ))}
      </div>
    </div>
  );
}