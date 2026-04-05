// Chatbot frontend
const chatInput = document.getElementById("chatbot-input");
const chatButton = document.getElementById("chatbot-send");
const chatMessages = document.getElementById("chatbot-messages");
const particlesContainer = document.getElementById("chatbot-particles");

// Floating black particles
for (let i=0;i<40;i++){
  const p=document.createElement("div");
  p.style.width=p.style.height=`${Math.random()*4+2}px`;
  p.style.background="black";
  p.style.position="absolute";
  p.style.borderRadius="50%";
  p.style.left=`${Math.random()*100}%`;
  p.style.top=`${Math.random()*100}%`;
  p.style.opacity=Math.random();
  particlesContainer.appendChild(p);
  animateParticle(p);
}
function animateParticle(p){
  let x=parseFloat(p.style.left);
  let y=parseFloat(p.style.top);
  const speedX=(Math.random()-0.5)/2;
  const speedY=(Math.random()-0.5)/2;
  function move(){
    x+=speedX; y+=speedY;
    if(x>100)x=0;if(x<0)x=100;
    if(y>100)y=0;if(y<0)y=100;
    p.style.left=x+"%";
    p.style.top=y+"%";
    requestAnimationFrame(move);
  }
  move();
}

function addMessage(content,sender){
  const msg=document.createElement("div");
  msg.className=`chat-message ${sender}`;
  msg.textContent=content;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop=chatMessages.scrollHeight;
}

async function sendMessage(){
  const message=chatInput.value.trim();
  if(!message)return;
  addMessage(message,"user");
  chatInput.value="";
  try{
    const res=await fetch("/api/chat",{ 
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({message})
    });
    const data=await res.json();
    if(data.reply)addMessage(data.reply,"ai");
    else addMessage("Sorry, something went wrong.","ai");
  }catch(err){
    addMessage("Error contacting AI.","ai");
    console.error(err);
  }
}

chatButton.addEventListener("click",sendMessage);
chatInput.addEventListener("keydown",e=>{if(e.key==="Enter")sendMessage();});
