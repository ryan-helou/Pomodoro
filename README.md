# 🍅 Pomodoro

*A single-screen focus timer with a WebGL gradient behind the clock.*

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)

A personal Pomodoro timer I built to actually enjoy looking at while I work. It counts down a work session, switches to a break, and loops, tracking how many pomodoros you've finished. Three presets ship in: Pomodoro (25/5), Short (15/3), and a keyboard-only Quick (5/1) on the `3` key. A custom dialog lets you dial work and break anywhere from 1 to 120 minutes. Spacebar pauses and resumes; `1` and `2` jump to the first two presets.

The visuals are the point. The background is `ColorBends`, a full-screen Three.js shader that warps a set of gradient colors, rotates them, and drifts toward your cursor. The countdown sits inside a `CircularProgressBar` — a shaded torus, also Three.js, whose lit arc shrinks as time runs out. The digits themselves use `VariableProximity`, so each glyph's font weight swells from 400 toward 900 as the pointer nears it.

Work and break each have their own accent color and three-stop gradient (work defaults to a pink/violet/teal blend, break to greens and cyan). Those choices, plus the sound and notification toggles, persist to `localStorage`; the timer durations reset on reload. Session-end sounds are synthesized with the Web Audio API — a double high beep leaving work, a lower one leaving break — and both sound and browser notifications are off until you turn them on.

Built with React 19, Vite, Tailwind, and Three.js. Live at https://pomodoro-eta-dusky.vercel.app/.
