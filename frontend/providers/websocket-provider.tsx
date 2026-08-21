'use client';
import {createContext,useRef} from 'react';
export const WebSocketContext=createContext<any>(null);
export default function WebSocketProvider({children}:any){
 const socket=useRef<WebSocket|null>(null);
 return <WebSocketContext.Provider value={{socket}}>{children}</WebSocketContext.Provider>;
}