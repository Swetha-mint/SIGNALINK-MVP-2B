const CAPACITY=4;
let buffer=[];
let totalEvents=0;
let evictions=0;

const slots=document.getElementById("slots");
const capacity=document.getElementById("capacity");
const status=document.getElementById("status");
const totalOut=document.getElementById("totalEvents");
const evictionsOut=document.getElementById("evictions");
const occupancyOut=document.getElementById("occupancy");
const operation=document.getElementById("operation");
const evictedOut=document.getElementById("evicted");
const log=document.getElementById("log");

function render(){
  slots.innerHTML="";
  for(let i=0;i<CAPACITY;i++){
    const el=document.createElement("div");
    el.className="slot"+(buffer[i]?" filled":"");
    el.innerHTML=`<span class="slot-index">SLOT ${i}</span><span class="slot-value">${buffer[i]||"—"}</span>`;
    slots.appendChild(el);
  }
  capacity.textContent=`${buffer.length} / ${CAPACITY}`;
  occupancyOut.textContent=`${buffer.length} / ${CAPACITY}`;
  totalOut.textContent=totalEvents;
  evictionsOut.textContent=evictions;
}

function addLog(message){
  const li=document.createElement("li");
  li.textContent=message;
  log.prepend(li);
}

function pushEvent(event){
  totalEvents++;
  let evicted=null;

  if(buffer.length===CAPACITY){
    evicted=buffer[0];
    // Explicit fixed-buffer behavior: shift existing entries left.
    for(let i=0;i<CAPACITY-1;i++) buffer[i]=buffer[i+1];
    buffer[CAPACITY-1]=event;
    evictions++;
  }else{
    buffer[buffer.length]=event;
  }

  operation.textContent=evicted
    ? `${event} entered · ${evicted} evicted`
    : `${event} entered · no eviction`;

  evictedOut.textContent=evicted
    ? `Oldest value removed: ${evicted}`
    : "No value evicted yet.";

  status.textContent=evicted
    ? `Fixed capacity reached — ${evicted} was pushed out.`
    : `${event} stored in the next available slot.`;

  addLog(evicted
    ? `Event ${totalEvents}: ${event} stored; ${evicted} evicted.`
    : `Event ${totalEvents}: ${event} stored.`);

  render();
}

document.querySelectorAll("[data-event]").forEach(button=>{
  button.addEventListener("click",()=>pushEvent(button.dataset.event));
});

document.getElementById("clear").addEventListener("click",()=>{
  buffer=[];
  totalEvents=0;
  evictions=0;
  operation.textContent="Waiting for an event…";
  evictedOut.textContent="No value evicted yet.";
  status.textContent="Buffer cleared. Four fixed slots available.";
  log.innerHTML="<li>Buffer cleared and reinitialized.</li>";
  render();
});

render();