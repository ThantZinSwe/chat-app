"use client";
import { createContext, useReducer } from "react";
import { useAuth } from "./AuthContext";
import { ChatState, ChatAction } from "../types/chat";

export const ChatContext = createContext<any>({});

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const INITIAL_STATE = {
    chatID: "null",
    user: {},
  };

  const { user: authUser } = useAuth();

  const chatReducer = (state: ChatState, action: ChatAction) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatID:
            authUser.uid > action.payload.uid
              ? authUser.uid + action.payload.uid
              : action.payload.uid + authUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer<any>(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
