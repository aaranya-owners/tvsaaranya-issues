/* =====================================================
   issues.js — Renders the Open Issues view
   ===================================================== */

'use strict';

async function initIssues() {
  const resp = await fetch('data/issues.json');
  const data = await resp.json();
  renderIssues(data);
}

function renderIssues(data) {
  const container = document.getElementById('issues-container');

  let html = '<div class="issues-grid">';

  data.issues.forEach(issue => {
    const hasReversal = issue.reversalFlag;
    const status = issue.tvsStatus || 'pending';

    // Photos
    const photoHTML = issue.images && issue.images.length > 0
      ? `<div class="photo-gallery" style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);">
          ${issue.images.map((img, i) =>
            `<img class="photo-thumb" src="${img}" alt="Issue ${issue.id} photo ${i+1}"
              data-issue="${issue.id}" data-idx="${i}"
              onerror="this.style.display='none'">`
          ).join('')}
        </div>`
      : '';

    // TVS Response box
    const tvsBox = `
      <div class="tvs-response-box status-${status}">
        <div class="tvs-response-header">
          <span class="tvs-label" style="color:var(--text-muted)">TVS Response (Apr 2, 2026)</span>
          ${statusPill(status, issue.tvsStatus === 'rejected' ? 'Not Within Scope' :
            issue.tvsStatus === 'completed' ? 'Completed' :
            issue.tvsStatus === 'scheduled' ? `Scheduled – ${issue.tvsTimeline}` :
            `To Be Confirmed`)}
        </div>
        <div style="font-size:0.88rem;line-height:1.6;">${escHtml(issue.tvsResponse)}</div>
        ${issue.tvsTimeline && issue.tvsStatus !== 'rejected' && issue.tvsTimeline !== 'To be confirmed'
          ? `<div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.3rem;">📅 Timeline: <strong>${escHtml(issue.tvsTimeline)}</strong></div>`
          : ''}
        ${issue.note ? `<div style="font-size:0.78rem;color:var(--orange);margin-top:0.4rem;font-style:italic;">⚠️ ${escHtml(issue.note)}</div>` : ''}
      </div>`;

    // Reversal flag
    const reversalHTML = hasReversal
      ? `<div class="reversal-flag">
          <div class="reversal-header">
            <span class="reversal-icon">⚠️</span>
            POSITION REVERSAL / BROKEN COMMITMENT
          </div>
          <div>${escHtml(issue.reversalNote)}</div>
        </div>`
      : '';

    html += `
      <div class="issue-card" id="issue-${issue.id}">
        <div class="issue-card-header">
          <div class="issue-number">${issue.id}</div>
          <div class="issue-title">${escHtml(issue.title)}</div>
          <span class="issue-category">${escHtml(issue.category)}</span>
        </div>
        <div class="issue-card-body">
          <div class="problem-section">
            <div class="section-label">Problem Statement</div>
            <div class="problem-text">${escHtml(issue.problem)}</div>
            ${issue.raisedSince ? `<div class="raised-since">📅 Raised since: <strong>${escHtml(issue.raisedSince)}</strong></div>` : ''}
          </div>
          <div class="fix-section">
            <div class="section-label">What We're Asking For</div>
            <div class="fix-box">${escHtml(issue.fix)}</div>
          </div>
          ${tvsBox}
          ${reversalHTML}
          ${photoHTML}
        </div>
      </div>
    `;
  });

  html += '</div>';

  // Evidence gallery
  if (data.evidenceImages && data.evidenceImages.length > 0) {
    html += `
      <div class="evidence-gallery-section">
        <h2>📸 Evidence Gallery — Presentation Submitted to TVS (Aug 2025)</h2>
        <p>These photos were part of the "Aranya Villas — Problems to be Addressed" presentation attached to the Aug 12 and Jul 14 emails. They include: main road condition at project launch vs now, animals inside the community, construction workers climbing compound walls, and unauthorised entry evidence.</p>
        <div class="evidence-grid">
          ${data.evidenceImages.map((img, i) =>
            `<img class="evidence-thumb" src="${img}" alt="Evidence photo ${i+1}"
              data-idx="${i}" onerror="this.style.display='none'">`
          ).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;

  // Attach lightbox to issue photos
  container.querySelectorAll('.photo-thumb').forEach(img => {
    img.addEventListener('click', () => {
      const issueId = parseInt(img.dataset.issue);
      const issue = data.issues.find(i => i.id === issueId);
      const idx = parseInt(img.dataset.idx);
      openLightbox(issue.images, idx, `Issue ${issue.id}: ${issue.title}`);
    });
  });

  // Attach lightbox to evidence photos
  container.querySelectorAll('.evidence-thumb').forEach(img => {
    img.addEventListener('click', () => {
      const idx = parseInt(img.dataset.idx);
      openLightbox(data.evidenceImages, idx, 'Evidence: TVS Aaranya Community Problems');
    });
  });
}

function escHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

window.initIssues = initIssues;
