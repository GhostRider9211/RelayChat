import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const CHAT_GROUP = BASE_URL + "/api/chat-group";
export const CHAT_GROUP_USERS = BASE_URL + "/api/chat-group-user";
export const CHATS_URL = BASE_URL + "/api/chats";
export const API_URL = BASE_URL + "/api";
export const LOGIN_URL = API_URL + "/auth/login";
