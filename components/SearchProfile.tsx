import React, { useContext, useState } from "react";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { UserDetails } from "../types/user";
import { ChatContext } from "../context/ChatContext";

export default function SearchProfile({ authUser }: { authUser: UserDetails }) {
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [error, setError] = useState(false);
  const { dispatch } = useContext(ChatContext);

  const searchUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = query(
      collection(db, "users"),
      where("displayName", "!=", authUser?.displayName)
    );

    try {
      const querySnapshot = await getDocs(data);
      setUsers([]);

      if (querySnapshot.empty) {
        setUsers([]);
        return;
      }

      querySnapshot.docs.filter((doc) => {
        if (doc.data().displayName.includes(name) && name.trim().length > 0) {
          setUsers((prevUser) => [...prevUser, doc.data()]);
        }
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleChat = async (user: DocumentData) => {
    const combinedID =
      authUser.uid > user.uid
        ? authUser.uid + user.uid
        : user.uid + authUser.uid;

    try {
      const result = await getDoc(doc(db, "chats", combinedID));

      if (!result.exists()) {
        await setDoc(doc(db, "chats", combinedID), { message: [] });

        await updateDoc(doc(db, "userChats", authUser.uid), {
          [combinedID + ".date"]: serverTimestamp(),
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".date"]: serverTimestamp(),
          [combinedID + ".userInfo"]: {
            uid: authUser.uid,
            displayName: authUser.displayName,
          },
        });
      }

      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (error) {}
  };
  return (
    <>
      <div className="flex flex-row items-center justify-between text-xs mt-10">
        <span className="font-bold">Find a user.</span>
      </div>
      <div className="mt-3">
        <form action="" onSubmit={searchUser}>
          <div className="flex items-center bg-gray-200 rounded-md text-sm">
            <div className="px-2">
              <svg
                className="fill-current text-gray-500 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  className="heroicon-ui"
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                />
              </svg>
            </div>
            <input
              className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
              id="search"
              type="text"
              name="name"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
              placeholder="Search user"
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2">
        {(error || users.length <= 0) && (
          <span className="text-center text-sm text-gray-400">
            Empty user...
          </span>
        )}
        {users.length > 0 &&
          users.map((user) => (
            <button
              type="button"
              onClick={() => handleChat(user)}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 mt-2"
              key={user?.uid}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user?.displayName}`}
                alt={user?.displayName}
                className="flex items-center justify-center bg-primary-200 rounded-full h-8 w-8"
              />
              <div className="ml-2 text-sm font-semibold">
                {user?.displayName}
              </div>
            </button>
          ))}
      </div>
    </>
  );
}
