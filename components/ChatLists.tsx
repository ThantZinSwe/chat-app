import React, { useContext, useEffect, useState } from "react";
import { UserDetails } from "../types/user";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { ChatContext } from "../context/ChatContext";

export default function ChatLists({ authUser }: { authUser: UserDetails }) {
  const [chatLists, setChatLists] = useState<DocumentData[]>([]);
  const { dispatch } = useContext(ChatContext);

  const handleSelected = (user: DocumentData[]) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", authUser.uid), (doc) => {
      setChatLists(doc.data() as DocumentData[]);
    });

    return () => {
      unsub();
    };
  }, [authUser.uid]);

  return (
    <div className="mt-10">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Active Conversations</span>
        <span className="flex items-center justify-center text-xs text-white bg-primary-500 h-4 w-4 rounded-full leading-none">
          {Object.entries(chatLists)?.length}
        </span>
      </div>

      <div className="flex flex-col space-y-1 mt-4 -mx-2">
        <div className="h-48 overflow-auto">
          {chatLists && (
            <>
              {Object.entries(chatLists)?.map((chatList) => (
                <button
                  type="button"
                  className="flex flex-row items-center justify-between hover:bg-gray-100 rounded-xl p-2 mt-2 w-full"
                  key={chatList[0]}
                  onClick={() => handleSelected(chatList[1]?.userInfo)}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${chatList[1]?.userInfo?.displayName}`}
                      alt={chatList[1]?.userInfo?.displayName}
                      className="flex items-center justify-center bg-primary-200 rounded-full h-8 w-8"
                    />
                    <div className="ml-2 text-sm font-semibold">
                      {chatList[1]?.userInfo?.displayName}
                    </div>
                  </div>

                  <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded-full leading-none">
                    2
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
