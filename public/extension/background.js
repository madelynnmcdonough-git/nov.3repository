const allowed=url=>{try{const u=new URL(url);return (u.origin==='https://madelynnmcdonough-git.github.io'||['http://localhost:5173','http://127.0.0.1:5173','http://localhost:5174','http://127.0.0.1:5174'].includes(u.origin))&&u.pathname.startsWith('/nov.3repository/')}catch{return false}};
chrome.runtime.onMessage.addListener((message,sender,respond)=>{
 if(sender.id!==chrome.runtime.id||sender.frameId!==0||!allowed(sender.url)){respond({error:'Unauthorized dashboard origin, frame, or path.'});return false}
 if(!['status','approve','history','disconnect'].includes(message?.type)){respond({error:'Unsupported request.'});return false}
 (async()=>{try{
  if(message.type==='status'){respond({connected:true,permitted:await chrome.permissions.contains({permissions:['history']})});return}
  if(message.type==='approve'){try{await chrome.action.openPopup();respond({opened:true})}catch{respond({error:'Click the Orbit extension icon in Chrome, then approve history access.'})}return}
  if(message.type==='disconnect'){await chrome.permissions.remove({permissions:['history']});respond({disconnected:true});return}
  if(!await chrome.permissions.contains({permissions:['history']})){respond({error:'Approve access using the Orbit extension icon, then try again.'});return}
  if(![7,30,90].includes(message.days))throw Error('Unsupported history period.');
  const endTime=Date.now(),startTime=endTime-message.days*86400000;
  const pages=await chrome.history.search({text:'',startTime,endTime,maxResults:10000});
  const records=[];let skipped=0;
  // getVisits supplies actual visit times; aggregate lifetime visitCount is never expanded.
  for(let i=0;i<pages.length;i+=20){
   if(!await chrome.permissions.contains({permissions:['history']}))throw Error('History permission was revoked.');
   const batch=await Promise.all(pages.slice(i,i+20).map(async page=>{
    try{if(!/^https?:\/\//.test(page.url??''))return [];const u=new URL(page.url);u.username='';u.password='';u.search='';u.hash='';const visits=await chrome.history.getVisits({url:page.url});return visits.filter(v=>v.visitTime>=startTime&&v.visitTime<=endTime).map(v=>({url:u.href,title:page.title,time:v.visitTime}))}catch{skipped++;return []}
   }));
   for(const visits of batch){records.push(...visits.slice(0,100000-records.length));if(records.length>=100000)break}
   if(records.length>=100000)break;
  }
  respond({records,truncated:pages.length>=10000||records.length>=100000,skipped,startTime,endTime});
 }catch(e){respond({error:e.message})}})();return true;
});
