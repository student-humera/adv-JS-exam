# Advanced JavaScript Assessment — Starter Kit

Every file you need is already created. Do not rename folders or files.

## Where your answers go

    section-a/   a1.js  a2.js  a3.js  a4.html
    section-b/   b1.js  b2.js  b3.js
    section-c/   c1.js  c2.js
    section-d/   app.js  (only app.js — index.html and styles.css are given)

Section A: write your prediction in the comment slots BEFORE running anything.
Sections B and C: fill in the comment block at the top of each file, then fix
or rewrite the code below it.

## Running the files

Sections A1-A3, B and C run in Node:

    node section-b/b1.js

Section A4 is HTML — open it in a browser and use the console.

## Running Section D

Open a terminal in `section-d/` and run ONE of these:

    npx serve .
    python3 -m http.server 5500

Then open the localhost URL it prints. Opening index.html directly from
your file manager will NOT work — ES modules need a server.

If the network is down or dummyjson.com is blocked, tell your instructor
and switch the URL at the top of app.js to the offline copy:

    const API_URL = './products.json';
