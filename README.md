Project Overview

This project is a browser–based seesaw (terazi) simulation built with only HTML, CSS, and vanilla JavaScript.
Users can place weights on the beam and observe how torque affects the tilt angle in real time.
The simulation models balance using simplified physics:
each object applies torque based on its mass and distance from the pivot.

Architecture

The application is built as a set of small, independent modules, each responsible for a single task.
Together, these modules form a pipeline that processes state, updates physics, renders the scene, and logs interactions.

Core Modules
Module	Description
state.js	Holds global simulation state such as objects, totals, beam angle
physics.js	Computes torque + resulting tilt angle
renderer.js	Draws the seesaw and weights onto the canvas
controls.js	Handles mouse interactions & weight placement
ui.js	Updates counters + history log in the DOM
main.js	Main loop — orchestrates animation + updates

Each module is independent — meaning code is easy to understand, maintain, and extend.

How It Works
1) User Interaction

When the user moves their mouse over the beam, a “ghost” preview shows where the weight would land.
Clicking places the next weight at that location.

2) Object List

Each placed weight becomes an object with:

mass (kg)

x-position (meters from pivot)

animated drop offset

All objects are stored inside state.objects.

3) Physics

Torque is computed as:

τ = mass × gravity × distance


All torques are summed; the resulting total torque determines the tilt angle.

The angle is clamped so the board never rotates beyond ±30°.

4) Animation (Pipeline Loop)

Every animation frame:

updateDrops()
calculateTorque()
calculateAngle()
updateUI()
renderCanvas()


This loop runs via requestAnimationFrame, ensuring smooth visual behavior.

5) Rendering

The board is rotated by the computed angle.
Weights drop visually, then attach to the beam once landed.

6) UI

Counters update live:

left total

right total

tilt angle

next weight value

A scrollable history shows each placement.

 Data Flow
User click
  → create weight
     → place into objects
        → simulate drop
           → torque solver
              → final angle
                 → render + logs


All behavior flows in one direction — predictable and clean.

 Design Decisions

- Realistic torque model
- Angle limiting for visual clarity
- Smooth animation, not instant jumps
- Modular code structure
- Lightweight — no dependencies
- Responsive UI
- Log history for transparency

Extensibility

The structure allows easy enhancements:

friction / damping

different beam lengths

different gravity

reset animation

audio feedback

multi-weight selection

undo

save/load scenarios

 Summary

This project simulates seesaw balance using real–world torque equations.
The codebase is structured into modular components handling:

state management

physics

UI

rendering

input

logging

This creates a clean and maintainable simulation that is easy to expand.
