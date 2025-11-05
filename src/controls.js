
import { state } from './state.js';
import {
  getRandomWeight,
  updateNextWeight,
  updateTotals,
  logEvent
} from './ui.js';
import { render } from './renderer.js';

const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

export function bindInteractions(canvas, ctx){
  
  const halfLen = state.beam.length / 2;

  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const xPx = e.clientX - rect.left - rect.width / 2;
    let xM = xPx / state.ppm;

    xM = clamp(xM, -halfLen, halfLen);

    state.ghost.active = true;
    state.ghost.x = xM;
    render(ctx, canvas);
  });

  canvas.addEventListener('mouseleave', () => {
    state.ghost.active = false;
    render(ctx, canvas);
  });

  
  canvas.addEventListener('click', () => {
    let xM = state.ghost.active ? state.ghost.x : 0;

    xM = clamp(xM, -halfLen, halfLen);

    const mass = state.nextWeight;

   
    state.objects.push({
      mass,
      x: xM,
      drop: { y: -160 }
    });

   
 if (xM < 0) {
  state.leftTotal += mass;
  logEvent(`⬅️ +${mass}kg (x=${xM.toFixed(2)}m)`);
} else {
  state.rightTotal += mass;
  logEvent(`➡️ +${mass}kg (x=${xM.toFixed(2)}m)`);
}
    updateTotals();

    
    state.nextWeight = getRandomWeight();
    updateNextWeight();

    render(ctx, canvas);
  });

  
  const resetBtn = document.getElementById('resetBtnBottom');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.objects = [];
      state.leftTotal = 0;
      state.rightTotal = 0;
      state.theta = 0;
      state.ghost.active = false;

      state.nextWeight = getRandomWeight();
      updateNextWeight();
      updateTotals();
      logEvent('Reset scene');

      render(ctx, canvas);
    });
  }
}
