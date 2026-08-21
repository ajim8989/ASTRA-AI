import { useState } from 'react';
export function useChat(){
  const [messages,setMessages]=useState<string[]>([]);
  const send=(msg:string)=>setMessages(m=>[...m,msg]);
  return {messages,send};
}