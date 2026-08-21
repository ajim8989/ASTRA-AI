import { useState } from 'react';
export function useStream(){
  const [streaming,setStreaming]=useState(false);
  return {streaming,start:()=>setStreaming(true),stop:()=>setStreaming(false)};
}