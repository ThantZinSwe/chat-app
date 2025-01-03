"use client";
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { user: authUser } = useAuth();
  const { data } = useContext(ChatContext);

  const send = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updateDoc(doc(db, "chats", data.chatID), {
      messages: arrayUnion({
        id: uuid(),
        text: text,
        senderID: authUser.uid,
        date: Timestamp.now(),
      }),
    });

    updateLastMessage(authUser.uid);
    updateLastMessage(data.user.uid);
    setText("");
  };

  const updateLastMessage = async (uid: string) => {
    await updateDoc(doc(db, "userChats", uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });
  };

  useEffect(() => {
    const unsubcribe = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      const idsMatch =
        doc.id === data.user.uid + authUser.uid ||
        doc.id === authUser.uid + data.user.uid;

      setMessages(doc.exists() && idsMatch ? doc.data().messages : []);
    });

    return () => {
      unsubcribe();
    };
  }, [data.chatID, data.user.uid]);

  return (
    <>
      {data.chatID != "null" && messages && messages.length > 0 && (
        <div className="flex flex-col w-full h-full p-6">
          <div className="rounded p-3 flex flex-row-reverse">
            <div className="flex flex-row items-center space-x-2">
              <img
                src={`https://ui-avatars.com/api/?name=${data.user.displayName}`}
                alt={data.user.displayName}
                className="flex items-center justify-center bg-primary-200 rounded-full h-10 w-10"
              />
              <div className="ml-2 font-semibold">{data.user.displayName}</div>
            </div>
          </div>
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col w-full h-full overflow-x-auto mb-4">
              {messages &&
                messages.map((message, index) => (
                  <Message message={message} key={index} />
                ))}
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              {/* copy clip */}
              {/* <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div> */}
              <form
                action=""
                className="flex items-center w-full"
                onSubmit={send}
              >
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={text}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setText(event.target.value)
                      }
                      className="flex w-full border rounded-xl focus:outline-none focus:border-primary-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-primary-500 hover:bg-primary-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
