export function useWebSocket(){
  return {connected:false,connect:()=>{},disconnect:()=>{},send:(_:string)=>{}};
}