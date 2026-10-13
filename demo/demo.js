/**
 * Demo wiring — vanilla JS against @awesome-orbs-2027/core's dist build.
 * Serve this folder over http; ES modules are blocked on file://.
 */
import { createOrb, getState, stateNames } from '../packages/core/dist/index.js';

const app = document.getElementById('app');
const orbs = [];
function mount(parent, opts) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', `${opts.state || 'working'} indicator`);
  parent.appendChild(canvas);
  const orb = createOrb(canvas, opts);
  orbs.push(orb);
  return orb;
}

// ---- theme toggle (drives theme:"auto" via [data-theme]) ----
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const dark = app.dataset.theme !== 'dark';
  app.dataset.theme = dark ? 'dark' : 'light';
  themeToggle.textContent = dark ? '☀ Light' : '◑ Dark';
});

// ---- state grid ----
const grid = document.getElementById('stateGrid');
for (const name of stateNames()) {
  const meta = getState(name);
  const cell = document.createElement('div');
  cell.className = 'cell';
  const big = document.createElement('div');
  cell.appendChild(big);
  mount(big, { state: name, size: 64, theme: 'auto' });
  const nm = document.createElement('div');
  nm.className = 'name';
  nm.textContent = meta.label;
  cell.appendChild(nm);
  const desc = document.createElement('div');
  desc.className = 'desc';
  desc.textContent = meta.description;
  cell.appendChild(desc);
  const sizes = document.createElement('div');
  sizes.className = 'sizes';
  for (const s of [32, 20]) {
    const wrap = document.createElement('div');
    mount(wrap, { state: name, size: s, theme: 'auto' });
    const lab = document.createElement('span');
    lab.textContent = `${s}px`;
    wrap.appendChild(lab);
    sizes.appendChild(wrap);
  }
  cell.appendChild(sizes);
  grid.appendChild(cell);
}

// ---- mock chat panel ----
let chatState = 'searching';
let chatSpeed = 1;
const chatOrb = mount(document.getElementById('chatOrb'), {
  state: chatState,
  size: 32,
  theme: 'auto',
  speed: chatSpeed,
});
const chatLabel = document.getElementById('chatLabel');
const stateRow = document.getElementById('stateRow');
function renderStateRow() {
  stateRow.innerHTML = '';
  for (const name of stateNames()) {
    const btn = document.createElement('button');
    btn.className = 'btn' + (name === chatState ? ' active' : '');
    btn.textContent = getState(name).label;
    btn.addEventListener('click', () => {
      chatState = name;
      chatOrb.setState(name);
      chatLabel.textContent = `${name}…`;
      renderStateRow();
    });
    stateRow.appendChild(btn);
  }
}
renderStateRow();
const speedRow = document.getElementById('speedRow');
for (const v of [0.5, 1, 1.5, 2]) {
  const btn = document.createElement('button');
  btn.className = 'btn' + (v === chatSpeed ? ' active' : '');
  btn.textContent = `${v}×`;
  btn.addEventListener('click', () => {
    chatSpeed = v;
    chatOrb.setSpeed(v);
    [...speedRow.children].forEach((b, i) =>
      b.classList.toggle('active', [0.5, 1, 1.5, 2][i] === v),
    );
  });
  speedRow.appendChild(btn);
}

// ---- brand tint test ----
const tintGrid = document.getElementById('tintGrid');
for (const name of stateNames()) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  mount(cell, { state: name, size: 64, theme: 'auto', color: '#E8A020' });
  const nm = document.createElement('div');
  nm.className = 'name';
  nm.textContent = `${getState(name).label} · marigold`;
  cell.appendChild(nm);
  tintGrid.appendChild(cell);
}

// cleanup helper for HMR-less dev
window.__orbDemo = { orbs };
