export const G = 10;               
export const MAX_ANGLE = Math.PI / 6; 
export const SENSITIVITY = 0.01;   


export function netTorque(objects) {
  let t = 0;
  for (const o of objects) {
    t += o.mass * G * o.x; 
  }

  return Math.abs(t) < 1e-9 ? 0 : t;
}

export function solveAngle(objects, beamLength) {
  const tau = netTorque(objects);

  
  let theta = tau * SENSITIVITY;

 
  if (theta >  MAX_ANGLE) theta =  MAX_ANGLE;
  if (theta < -MAX_ANGLE) theta = -MAX_ANGLE;

  return theta;
}
