/* =====================================================
   timeline.js — Renders the email chronology view
   ===================================================== */

'use strict';

async function initTimeline() {
  const resp = await fetch('data/timeline.json');
  const data = await resp.json();
  renderTimeline(data);
}

function renderTimeline(data) {
  const container = document.getElementById('timeline-container');
  const escalationLevels = [
    { level: 1, cls: 'esc-1', label: 'Field CRM' },
    { level: 2, cls: 'esc-2', label: 'Formal Association' },
    { level: 3, cls: 'esc-3', label: 'CRM Head + CSMO' },
    { level: 4, cls: 'esc-4', label: 'CSMO + CEO Desk' }
  ];

  // Legend
  const legend = document.getElementById('escalation-legend');
  legend.innerHTML = `
    <span class="legend-title">Escalation Path:</span>
    ${escalationLevels.map(e => `<span class="esc-badge ${e.cls}">${e.label}</span>`).join('<span style="color:#cbd5e0">→</span>')}
  `;

  let html = '';

  data.emails.forEach((email, emailIdx) => {
    const d = formatDate(email.date);
    const isMilestone = email.milestone;
    const dirCls = email.direction === 'tvs-to-residents' ? 'dir-tvs' : 'dir-residents';
    const dirIcon = email.direction === 'tvs-to-residents' ? '⬇️' : '⬆️';
    const escLevel = escalationLevels.find(e => e.level === email.escalationLevel);
    const escBadge = escLevel ? `<span class="esc-badge ${escLevel.cls}">${escLevel.label}</span>` : '';

    // Photo gallery
    const photoHTML = email.images && email.images.length > 0
      ? `<div class="photo-gallery">
          ${email.images.map((img, i) =>
            `<img class="photo-thumb" src="${img}" alt="Email photo ${i+1}"
              data-email="${email.id}" data-idx="${i}"
              onerror="this.style.display='none'">`
          ).join('')}
        </div>`
      : '';

    // Body
    const paras = (email.bodyParagraphs || []).map(p =>
      `<p class="email-paragraph">${escapeHtml(p)}</p>`
    ).join('');

    // Special: email-6 has table reference
    const tableHint = email.hasTable
      ? `<div class="response-table-preview">
          <h4>29-Point Response Summary</h4>
          <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:0.75rem;">
            This email contains a full 29-point response table. View the complete tracker below:
          </p>
          <button class="view-full-tracker" onclick="showView('tracker-view')">
            📊 Open TVS Response Tracker →
          </button>
        </div>`
      : '';

    // Milestone banner
    const milestoneBanner = isMilestone
      ? `<div class="milestone-banner">
          <span class="milestone-icon">🚨</span>
          <div><strong>MILESTONE:</strong> ${escapeHtml(email.milestoneNote)}</div>
        </div>`
      : '';

    html += `
      <div class="timeline-entry ${isMilestone ? 'milestone' : ''}" id="${email.id}">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="card-header">
            <div class="date-badge">
              <span class="month">${d.month}</span>
              <span class="day">${d.day}</span>
              <span class="year">${d.year}</span>
            </div>
            <div class="card-meta">
              <div class="direction-badge ${dirCls}">${dirIcon} ${escapeHtml(email.directionLabel)}</div>
              <div class="card-subject">${escapeHtml(email.subject)}</div>
              <div class="card-participants">
                <span>From:</span> ${escapeHtml(email.from)}<br>
                <span>To:</span> ${escapeHtml(email.to)}
                ${email.cc ? `<br><span>CC:</span> ${escapeHtml(email.cc)}` : ''}
              </div>
            </div>
            <div class="escalation-indicator">${escBadge}</div>
          </div>
          ${milestoneBanner}
          <div class="card-body">
            <div class="email-preview">${escapeHtml(email.preview)}</div>
            <button class="expand-btn" onclick="toggleEmailBody(this, 'full-${email.id}')">
              ▼ Read full email
            </button>
            <div class="email-full" id="full-${email.id}">
              ${paras}
            </div>
            ${email.escalationNote
              ? `<div class="escalation-note">📌 ${escapeHtml(email.escalationNote)}</div>`
              : ''}
            ${photoHTML}
            ${tableHint}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Attach lightbox to photo thumbs
  container.querySelectorAll('.photo-thumb').forEach(img => {
    img.addEventListener('click', () => {
      const emailId = img.dataset.email;
      const email = data.emails.find(e => e.id === emailId);
      const idx = parseInt(img.dataset.idx);
      openLightbox(email.images, idx, `${email.dateDisplay} — ${email.subject}`);
    });
  });

  // People sidebar
  renderPeople(data.people);
}

function renderPeople(people) {
  const tvsList = document.getElementById('tvs-people-list');
  const assocList = document.getElementById('assoc-people-list');
  if (!tvsList || !assocList) return;

  tvsList.innerHTML = people.tvs.map(p =>
    `<li><strong>${escapeHtml(p.name)}</strong> — <em>${escapeHtml(p.role)}</em></li>`
  ).join('');

  assocList.innerHTML = people.association.map(p =>
    `<li><strong>${escapeHtml(p.name)}</strong>, ${escapeHtml(p.villa)} — <em>${escapeHtml(p.role)}</em></li>`
  ).join('');
}

function toggleEmailBody(btn, id) {
  const full = document.getElementById(id);
  const open = full.classList.toggle('open');
  btn.textContent = open ? '▲ Collapse' : '▼ Read full email';
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

window.toggleEmailBody = toggleEmailBody;
window.initTimeline = initTimeline;
