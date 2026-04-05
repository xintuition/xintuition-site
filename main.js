const chatInput=document.getElementById('chat-input');
const chatMessages=document.querySelector('#chatbot .chat-messages');
const chatCTA=document.getElementById('chat-cta');
const chatbot=document.getElementById('chatbot');
const chatPreview=document.getElementById('chat-preview');
const roomViewer=document.getElementById('room-viewer');

// VIP CTA
chatCTA?.addEventListener('click',()=>{alert('VIP pre-signup coming soon!');});

// Floating particles
if(chatbot){
  for(let i=0;i<25;i++){
    const p=document.createElement('div');
    p.classList.add('particle');
    p.style.top=`${Math.random()*100}%`;
    p.style.left=`${Math.random()*100}%`;
    p.style.width=`${Math.random()*3+2}px`;
    p.style.height=p.style.width;
    chatbot.appendChild(p);
    let dirY=Math.random()>0.5?1:-1;
    let dirX=Math.random()>0.5?1:-1;
    setInterval(()=>{
      const top=parseFloat(p.style.top);
      const left=parseFloat(p.style.left);
      p.style.top=`${(top+dirY*0.2)%100}%`;
      p.style.left=`${(left+dirX*0.2)%100}%`;
    },30);
  }
}

// Sparkles
function spawnSparkles(count=8){
  for(let i=0;i<count;i++){
    const s=document.createElement('div');
    s.classList.add('sparkle');
    s.style.top=`${Math.random()*90+5}%`;
    s.style.left=`${Math.random()*90+5}%`;
    s.style.setProperty('--randX',Math.random());
    chatbot.appendChild(s);
    setTimeout(()=>s.remove(),1200);
  }
}

// Messages
function appendMessage(sender,text,previewHTML=null){
  const div=document.createElement('div');
  div.className=sender;
  div.textContent=text;
  div.style.textShadow="0 0 8px #ff758c,0 0 12px #42e695";
  chatMessages.appendChild(div);
  chatMessages.scrollTop=chatMessages.scrollHeight;
  if(sender==='ai'){
    spawnSparkles();
    if(previewHTML) chatPreview.innerHTML=previewHTML;
  }
}

// Input
chatInput.addEventListener('keypress',async(e)=>{
  if(e.key==='Enter'&&chatInput.value.trim()!==''){
    const msg=chatInput.value.trim();
    appendMessage('user',msg);
    chatInput.value='';
    // Replace with your AI backend
    const response=await fetch('https://your-ai-backend.com/query',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({question:msg})
    });
    const data=await response.json();
    appendMessage('ai',data.answer,data.previewHTML);
    renderRoom3D();
  }
});

// 3D Room Viewer
function renderRoom3D(){
  roomViewer.innerHTML='';
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(75,roomViewer.clientWidth/roomViewer.clientHeight,0.1,1000);
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(roomViewer.clientWidth,roomViewer.clientHeight);
  roomViewer.appendChild(renderer.domElement);
  const geometry=new THREE.BoxGeometry(2,2,2);
  const material=new THREE.MeshStandardMaterial({color:0x42e695});
  const cube=new THREE.Mesh(geometry,material);
  scene.add(cube);
  const light=new THREE.DirectionalLight(0xffffff,1);
  light.position.set(5,5,5);
  scene.add(light);
  camera.position.z=5;
  function animate(){requestAnimationFrame(animate);cube.rotation.y+=0.01;cube.rotation.x+=0.005;renderer.render(scene,camera);}
  animate();
}
