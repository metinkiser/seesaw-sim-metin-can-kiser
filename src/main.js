
import { bindUI, updateTilt } from './ui.js';
import { resizeCanvas, render } from './renderer.js';
import { bindInteractions } from './controls.js';
import { state } from './state.js';
import { solveAngle } from './physics.js';

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

let last = 0;
const DROP_SPEED = 400; 

function updateDrops(dt){
  for (const o of state.objects) {
    if (!o.drop) continue;
    o.drop.y += DROP_SPEED * dt;   
    if (o.drop.y >= 0) o.drop = null; 
  }
}

function loop(t){
  const now = t || performance.now();
  let dt = (now - last) / 1000;
  last = now;
  if (dt > 1/30) dt = 1/30;

  
  updateDrops(dt);

 
  const target = solveAngle(state.objects, state.beam.length);   
  const stiffness = 8;                                           
  const alpha = Math.min(1, stiffness * dt);
  state.theta += (target - state.theta) * alpha;

  
  updateTilt(state.theta);

  render(ctx, canvas);

  requestAnimationFrame(loop);
}

function init(){
  resizeCanvas(canvas);
  render(ctx, canvas);
  bindUI();
  bindInteractions(canvas, ctx);

  last = performance.now();
  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
  resizeCanvas(canvas);
  render(ctx, canvas);
});

init();
