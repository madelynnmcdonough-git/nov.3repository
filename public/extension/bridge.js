// Isolated-world bridge: no remote code, no storage, no credentials.
window.addEventListener('message',event=>{
 if(event.source!==window||event.origin!==location.origin||event.data?.channel!=='orbit-request-v1')return;
 const {id,type,days}=event.data;
 if(typeof id!=='string'||id.length>80||!['status','approve','history','disconnect'].includes(type))return;
 chrome.runtime.sendMessage({type,days},response=>{
  const error=chrome.runtime.lastError;
  window.postMessage({channel:'orbit-response-v1',id,response:error?{error:error.message}:response},location.origin);
 });
});
