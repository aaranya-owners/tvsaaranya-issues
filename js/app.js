/* =====================================================
   app.js — View routing, lightbox, shared utilities
   ===================================================== */

'use strict';

// ── View Router ──
const views = document.querySelectorAll('.view');
const tabs = document.querySelectorAll('.nav-tab');

function showView(viewId) {
  views.forEach(v => v.classList.toggle('active', v.id === viewId));
  tabs.forEach(t => t.classList.toggle('active', t.dataset.view === viewId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#' + viewId);
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => showView(tab.dataset.view));
});

// ── Lightbox ──
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
let lbImages = [];
let lbIdx = 0;

function openLightbox(images, idx, caption) {
  lbImages = images;
  lbIdx = idx;
  lbImg.src = images[idx];
  lbCaption.textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNavigate(dir) {
  lbIdx = (lbIdx + dir + lbImages.length) % lbImages.length;
  lbImg.src = lbImages[lbIdx];
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => lbNavigate(-1));
document.getElementById('lb-next').addEventListener('click', () => lbNavigate(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNavigate(-1);
  if (e.key === 'ArrowRight') lbNavigate(1);
});

// ── Utility ──
function statusPill(status, label) {
  const map = {
    completed: { cls: 'pill-completed', icon: '✅' },
    scheduled: { cls: 'pill-scheduled', icon: '📅' },
    pending:   { cls: 'pill-pending',   icon: '❓' },
    rejected:  { cls: 'pill-rejected',  icon: '🚫' }
  };
  const s = map[status] || map.pending;
  return `<span class="status-pill ${s.cls}">${s.icon} ${label || status}</span>`;
}

function formatDate(d) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const parts = d.split('-');
  return { month: months[parseInt(parts[1])-1], day: parts[2], year: parts[0] };
}

// ── Init routing ──
window.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#', '') || 'timeline-view';
  const validViews = ['timeline-view', 'issues-view', 'tracker-view'];
  showView(validViews.includes(hash) ? hash : 'timeline-view');
});

// Expose for other modules
window.openLightbox = openLightbox;
window.statusPill = statusPill;
window.formatDate = formatDate;
