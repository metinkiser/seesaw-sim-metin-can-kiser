// src/renderer.js
import { state } from './state.js';


const BEAM_Y = 15;                  
const HALF_THICK = 8;               
const BEAM_BOTTOM = BEAM_Y + HALF_THICK; 

export function resizeCanvas(canvas){
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width  = Math.floor(rect.width  * dpr);
  canvas.height = Math.floor(rect.height * dpr);

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);


  state.ppm = (rect.width * 0.6) / state.beam.length;
}


function drawWeightAt(ctx, xPx, baseY, mass, alpha = 1, dropY = 0){
  
  const r   = 20 * (alpha || 1);
  const gap = 6;
  const yPx = baseY - (r + gap) + dropY; 

  ctx.save();
  ctx.translate(xPx, yPx);

 
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'rgba(100,100,100,0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, (r + gap) - dropY);
  ctx.lineTo(0, r);
  ctx.stroke();
  ctx.restore();

  


  ctx.beginPath();
  ctx.fillStyle = '#71a9eb';
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.max(12, Math.round(12*alpha))}px system-ui,Segoe UI,Roboto,Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${mass}kg`, 0, 0);

  ctx.restore();
}


function drawSupport(ctx){
  
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-35, 50);
  ctx.lineTo( 35, 50);
  ctx.lineTo(  0, BEAM_BOTTOM);
  ctx.closePath();
  ctx.fillStyle = '#334155';
  ctx.fill();

  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
}


function drawBeam(ctx){
  ctx.save();
  const Lpx = state.beam.length * state.ppm;
  ctx.translate(0, BEAM_Y);        
  ctx.rotate(state.theta);          
  ctx.fillStyle = '#5f513c';
  ctx.fillRect(-Lpx/2, -HALF_THICK, Lpx, HALF_THICK*2); // -8..+8
  ctx.restore();
}

function drawObjects(ctx){
  ctx.save();
  ctx.translate(0, BEAM_Y);
  ctx.rotate(state.theta);
  const baseY = -HALF_THICK; 

  for (const b of state.objects){
    const xpx  = b.x * state.ppm;
    const yOff = b.drop ? b.drop.y : 0;
    drawWeightAt(ctx, xpx, baseY, b.mass, 1, yOff);
  }

  if (state.ghost && state.ghost.active){
    const gx = state.ghost.x * state.ppm;
    drawWeightAt(ctx, gx, baseY, state.nextWeight, 0.55, 0);
  }
  ctx.restore();
}


export function render(ctx, canvas){
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(w/2, h/2 + 40);
  drawBeam(ctx);
  drawObjects(ctx);
  drawSupport(ctx);

  ctx.restore();
}
