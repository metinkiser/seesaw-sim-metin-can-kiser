
import { state } from './state.js';


export function getRandomWeight(){

  return Math.floor(Math.random() * 20) + 1;
}


export function updateNextWeight(){
  const el = document.getElementById('nextWeight');
  if (el) el.textContent = state.nextWeight;
}

export function updateTotals(){
  const l = document.getElementById('leftWeight');
  const r = document.getElementById('rightWeight');
  if (l) l.textContent = state.leftTotal.toFixed(1);
  if (r) r.textContent = state.rightTotal.toFixed(1);
}

export function updateTilt(thetaRad){
  const deg = (thetaRad * 180 / Math.PI).toFixed(1);
  const el = document.getElementById('tiltAngle');
  if (el) el.textContent = deg;
}

export function bindUI(){
 
  updateNextWeight();
  updateTotals();
  updateTilt(0);
}

export function logEvent(text){
 
  if (!state.events) state.events = [];
  const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  state.events.unshift(`[${ts}] ${text}`);
  state.events = state.events.slice(0, 12);

  renderLog();
}

export function renderLog(){
  const list = document.getElementById('eventLog');
  if (!list) return;

  list.innerHTML = '';
  for (const item of state.events) {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  }
}
