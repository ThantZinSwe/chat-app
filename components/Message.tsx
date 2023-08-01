"use client";
import React, { useContext, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({ message }: { message: any }) {
  const { user: authUser } = useAuth();
  const { data } = useContext(ChatContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-12" ref={ref}>
        {message.senderID == authUser.uid ? (
          <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
              <img
                src={`https://ui-avatars.com/api/?name=${authUser.displayName}`}
                alt={authUser.displayName}
                className="flex items-center justify-center bg-primary-200 rounded-full h-8 w-8"
              />
              <div className="relative mr-3 text-sm bg-primary-100 py-2 px-4 shadow rounded-xl">
                <div>{message.text}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${data.user.displayName}`}
                alt={data.user.displayName}
                className="flex items-center justify-center bg-primary-200 rounded-full h-8 w-8"
              />
              <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                <div>{message.text}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
