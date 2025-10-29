const address = "R. Mario Ferreira Martins, 8 - Jardim dos Oliveiras, Campinas - SP, 13044-095";
const place = "Favoritta Pizzaria";
const eventTitle = "Aniversário — 29 anos";
const eventTimeText = "08/11 (sexta-feira) às 19:30";

const mapLink = document.getElementById("mapLink");
const waLink = document.getElementById("waLink");

mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place + " " + address)}`;
const waMsg = `Oi! Estou confirmando presença no ${eventTitle}.\nData: ${eventTimeText}\nLocal: ${place} — ${address}.`;
waLink.href = `https://wa.me/?text=${encodeURIComponent(waMsg)}`;

// ====== FOGOS VERDES E DOURADOS ======
(function fireworks(){
  const cnv = document.getElementById("sky");
  const ctx = cnv.getContext("2d");
  let w, h;
  function resize(){ w = cnv.width = innerWidth; h = cnv.height = innerHeight; }
  addEventListener("resize", resize, {passive:true});
  resize();

  const colors = ["#00ff88","#aaff66","#ccff33","#ffff66","#ffee33"];
  const particles = [];
  const GRAV = 0.03;
  const MAX = 500;
  let last = 0;

  function launch(x = Math.random()*w, y = h*0.3 + Math.random()*h*0.4){
    const count = 35 + Math.random()*25;
    for(let i=0;i<count;i++){
      const a = Math.random()*Math.PI*2;
      const s = 1.8 + Math.random()*2.5;
      particles.push({
        x, y,
        vx: Math.cos(a)*s,
        vy: Math.sin(a)*s,
        life: 0,
        max: 90 + Math.random()*60,
        c: colors[(Math.random()*colors.length)|0],
        r: 2 + Math.random()*3
      });
    }
    if(particles.length > MAX) particles.splice(0, particles.length-MAX);
  }

  function draw(){
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,w,h);
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += GRAV;
      p.life++;
      const alpha = 1 - p.life/p.max;
      if(alpha <= 0){ particles.splice(i,1); continue; }
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(ts){
    if(ts - last > 1500 + Math.random()*1500){
      last = ts;
      launch();
    }
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  cnv.addEventListener("click", e => launch(e.clientX, e.clientY));
})();
