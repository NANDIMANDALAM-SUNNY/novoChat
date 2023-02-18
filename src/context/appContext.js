import { io } from "socket.io-client";
import React,{createContext} from "react";
const SOCKET_URL = "https://novochatbackend.onrender.com";
export const socket = io(SOCKET_URL);
// app context
export const AppContext = createContext();
