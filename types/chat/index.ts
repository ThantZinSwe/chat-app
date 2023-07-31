import { UserDetails } from "../user";

export interface ChatState {
  chatID: null | string;
  user: UserDetails;
}

export interface ChatAction {
  type: "CHANGE_USER";
  payload: ChatState["user"];
}
