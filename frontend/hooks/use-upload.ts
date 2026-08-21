export function useUpload(){
  const upload=async(file:File)=>({success:true,fileName:file.name});
  return {upload};
}