/* =====================================================
   issues_full.js — Full 41-issue view (landing + detail)
   ===================================================== */
'use strict';

let issuesData = null;

async function initIssuesFull() {
  const resp = await fetch('data/issues_full.json');
  issuesData = await resp.json();
  renderLanding(issuesData);
  renderCritical(issuesData);
  renderAllIssues(issuesData);
}

// ── LANDING PAGE ──────────────────────────────────────
function renderLanding(data) {
  const el = document.getElementById('landing-container');
  if (!el) return;

  const critical = data.issues.filter(i => i.category === 'critical');
  const high = data.issues.filter(i => i.category === 'high');
  const requests = data.issues.filter(i => i.category === 'request');

  el.innerHTML = `
    <!-- PPTX link -->
    <div class="pptx-banner">
      <div class="pptx-inner">
        <div>
          <div class="pptx-title">📊 Full Presentation — Aaranya Open Issues</div>
          <div class="pptx-sub">41 Issues · 68 Slides · Presented to TVS Emerald Group Leadership · 10 April 2026</div>
        </div>
        <a class="pptx-btn" href="${data.meta.pptxUrl}" target="_blank" rel="noopener">
          ▶ View Slideshow
        </a>
        <a class="pptx-btn pptx-btn-secondary" href="Aaranya_Open_Issues-Final.pptx" download>
          ⬇ Download PPTX
        </a>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend-bar">
      <div class="legend-item legend-critical">
        <span class="legend-dot"></span>
        <div>
          <div class="legend-label">🔴 Critical Issues (#1–#6)</div>
          <div class="legend-desc">These are safety, security, life-threatening issues for TVS Emerald Aaranya Residents.</div>
        </div>
      </div>
      <div class="legend-item legend-high">
        <span class="legend-dot"></span>
        <div>
          <div class="legend-label">🟠 High Priority (#7–#31)</div>
          <div class="legend-desc">Significant issues affecting infrastructure, hygiene, and resident well-being.</div>
        </div>
      </div>
      <div class="legend-item legend-request">
        <span class="legend-dot"></span>
        <div>
          <div class="legend-label">🔵 New Requests (#32–#41)</div>
          <div class="legend-desc">Community improvement requests and enhancements for consideration.</div>
        </div>
      </div>
    </div>

    <!-- Critical -->
    <div class="landing-section">
      <div class="landing-section-header critical">
        <div class="lsh-left">
          <span class="lsh-icon">🔴</span>
          <div>
            <div class="lsh-title">CRITICAL ISSUES</div>
            <div class="lsh-range">Issues #1 – #6 · Immediate Action Required</div>
          </div>
        </div>
        <button class="lsh-view-btn" onclick="showView('critical-view')">View Details →</button>
      </div>
      <div class="landing-issue-list">
        ${critical.map(i => issueSummaryRow(i, 'critical')).join('')}
      </div>
    </div>

    <!-- High Priority -->
    <div class="landing-section">
      <div class="landing-section-header high">
        <div class="lsh-left">
          <span class="lsh-icon">🟠</span>
          <div>
            <div class="lsh-title">HIGH PRIORITY ISSUES</div>
            <div class="lsh-range">Issues #7 – #31 · Prompt Attention Required</div>
          </div>
        </div>
        <button class="lsh-view-btn" onclick="showView('all-issues-view');setTimeout(()=>document.getElementById('filter-high')?.click(),100)">View Details →</button>
      </div>
      <div class="landing-issue-list">
        ${high.map(i => issueSummaryRow(i, 'high')).join('')}
      </div>
    </div>

    <!-- New Requests -->
    <div class="landing-section">
      <div class="landing-section-header request">
        <div class="lsh-left">
          <span class="lsh-icon">🔵</span>
          <div>
            <div class="lsh-title">NEW REQUESTS</div>
            <div class="lsh-range">Issues #32 – #41 · For Consideration</div>
          </div>
        </div>
        <button class="lsh-view-btn" onclick="showView('all-issues-view');setTimeout(()=>document.getElementById('filter-request')?.click(),100)">View Details →</button>
      </div>
      <div class="landing-issue-list">
        ${requests.map(i => issueSummaryRow(i, 'request')).join('')}
      </div>
    </div>
  `;
}

function issueSummaryRow(issue, cat) {
  const trackerBadge = issue.trackerRefs && issue.trackerRefs.length
    ? `<span class="trace-badge trace-tracker" title="TVS Tracker items: ${issue.trackerRefs.join(', ')}">Tracker #${issue.trackerRefs.join(', #')}</span>`
    : '';
  const emailBadge = issue.emailRefs && issue.emailRefs.length
    ? `<span class="trace-badge trace-email" title="Referenced in emails">Email</span>`
    : '';
  const reversalBadge = issue.trackerRefs && issue.trackerRefs.some(r => [9,16,26,27,28].includes(r))
    ? `<span class="trace-badge trace-reversal">⚠️ Reversal</span>`
    : '';

  return `
    <div class="landing-row cat-${cat}" onclick="showView('all-issues-view');setTimeout(()=>document.getElementById('issue-detail-${issue.id}')?.scrollIntoView({behavior:'smooth'}),200)">
      <span class="row-num">#${issue.id}</span>
      <div class="row-info">
        <div class="row-title">${esc(issue.title)}</div>
        <div class="row-sub">${esc(issue.subtitle)}</div>
      </div>
      <div class="row-badges">
        ${trackerBadge}${emailBadge}${reversalBadge}
        ${!issue.hasPhoto ? '<span class="trace-badge trace-nophoto">No Photo</span>' : ''}
      </div>
    </div>
  `;
}

// ── CRITICAL ISSUES DETAILED VIEW ────────────────────
function renderCritical(data) {
  const el = document.getElementById('critical-container');
  if (!el) return;
  const critical = data.issues.filter(i => i.category === 'critical');

  let html = `
    <div class="critical-legend-box">
      <span class="critical-legend-icon">⚠️</span>
      <div>
        <strong>CRITICAL ISSUES LEGEND</strong><br>
        These are safety, security, life-threatening issues for TVS Emerald Aaranya Residents.
        These 6 issues demand immediate and urgent action from TVS Emerald Group Leadership.
      </div>
    </div>
    <div class="critical-grid">
  `;

  critical.forEach(issue => {
    html += renderIssueCard(issue, 'critical');
  });

  html += '</div>';
  el.innerHTML = html;
  attachLightbox(el, data);
}

// ── ALL ISSUES DETAILED VIEW ──────────────────────────
function renderAllIssues(data) {
  const el = document.getElementById('all-issues-container');
  if (!el) return;

  const cats = ['critical', 'high', 'request'];
  const labels = { critical: '🔴 Critical Issues', high: '🟠 High Priority', request: '🔵 New Requests' };

  let html = `
    <div class="issues-filter-bar">
      <button class="iss-filter-btn active" data-cat="all" id="filter-all">All (${data.issues.length})</button>
      <button class="iss-filter-btn filter-critical" data-cat="critical" id="filter-critical">🔴 Critical (6)</button>
      <button class="iss-filter-btn filter-high" data-cat="high" id="filter-high">🟠 High Priority (25)</button>
      <button class="iss-filter-btn filter-request" data-cat="request" id="filter-request">🔵 New Requests (10)</button>
    </div>
  `;

  cats.forEach(cat => {
    const items = data.issues.filter(i => i.category === cat);
    html += `
      <div class="issues-cat-section" data-cat="${cat}">
        <div class="issues-cat-header cat-header-${cat}">
          <span>${labels[cat]}</span>
          <span class="cat-count">${items.length} issues</span>
        </div>
        <div class="issues-detail-grid">
          ${items.map(i => renderIssueCard(i, cat)).join('')}
        </div>
      </div>
    `;
  });

  el.innerHTML = html;

  // Filter buttons
  el.querySelectorAll('.iss-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.iss-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      el.querySelectorAll('.issues-cat-section').forEach(s => {
        s.style.display = (cat === 'all' || s.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  attachLightbox(el, data);
}

function renderIssueCard(issue, cat) {
  const photos = issue.images && issue.images.length > 0
    ? `<div class="issue-photo-strip">
        ${issue.images.map((img, i) =>
          `<img class="issue-thumb" src="${img}" alt="Issue ${issue.id} photo ${i+1}"
            data-issueid="${issue.id}" data-idx="${i}"
            onerror="this.style.display='none'">`
        ).join('')}
      </div>`
    : (!issue.hasPhoto ? '<div class="no-photo-note">📷 No photo available</div>' : '');

  const fixList = issue.fix && issue.fix.length
    ? `<ul class="fix-list">${issue.fix.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`
    : '';

  const trackerLinks = issue.trackerRefs && issue.trackerRefs.length
    ? `<div class="trace-row">
        <span class="trace-label">TVS Tracker:</span>
        ${issue.trackerRefs.map(r =>
          `<a class="trace-link" onclick="showView('tracker-view')" href="#">#${r}</a>`
        ).join('')}
        ${issue.trackerRefs.some(r => [9,16,26,27,28].includes(r))
          ? '<span class="trace-badge trace-reversal">⚠️ Reversal</span>' : ''}
      </div>`
    : '';

  const emailLinks = issue.emailRefs && issue.emailRefs.length
    ? `<div class="trace-row">
        <span class="trace-label">Email thread:</span>
        ${issue.emailRefs.map(e =>
          `<a class="trace-link" onclick="showView('timeline-view');setTimeout(()=>document.getElementById('${e}')?.scrollIntoView({behavior:'smooth'}),200)" href="#">${emailLabel(e)}</a>`
        ).join('')}
      </div>`
    : '';

  const traceSection = (trackerLinks || emailLinks || issue.traceability)
    ? `<div class="trace-section">
        <div class="trace-section-label">Traceability</div>
        ${trackerLinks}${emailLinks}
        ${issue.traceability ? `<div class="trace-note">${esc(issue.traceability)}</div>` : ''}
      </div>`
    : '';

  return `
    <div class="issue-detail-card cat-border-${cat}" id="issue-detail-${issue.id}">
      <div class="idc-header cat-bg-${cat}">
        <div class="idc-num">#${issue.id}</div>
        <div class="idc-titles">
          <div class="idc-title">${esc(issue.title)}</div>
          <div class="idc-sub">${esc(issue.subtitle)}</div>
        </div>
        <span class="idc-cat-badge">${cat === 'critical' ? '🔴 Critical' : cat === 'high' ? '🟠 High Priority' : '🔵 Request'}</span>
      </div>
      <div class="idc-body">
        <div class="idc-section">
          <div class="idc-section-label">Problem Statement</div>
          <div class="idc-text">${esc(issue.problem)}</div>
        </div>
        ${fixList ? `<div class="idc-section">
          <div class="idc-section-label">Fix Required</div>
          <div class="idc-fix-box">${fixList}</div>
        </div>` : ''}
        ${photos}
        ${traceSection}
      </div>
    </div>
  `;
}

function emailLabel(id) {
  const map = {
    'email-1': 'Jul 14', 'email-2': 'Jul 17', 'email-3': 'Aug 12',
    'email-4': 'Nov 4', 'email-5': 'Mar 28', 'email-6': 'Apr 2'
  };
  return map[id] || id;
}

function attachLightbox(container, data) {
  container.querySelectorAll('.issue-thumb').forEach(img => {
    img.addEventListener('click', () => {
      const id = parseInt(img.dataset.issueid);
      const issue = data.issues.find(i => i.id === id);
      const idx = parseInt(img.dataset.idx);
      openLightbox(issue.images, idx, `#${issue.id} ${issue.title}`);
    });
  });
}

function esc(t) {
  if (!t) return '';
  return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

window.initIssuesFull = initIssuesFull;
