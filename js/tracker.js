/* =====================================================
   tracker.js — 29-Point TVS Response Tracker
   ===================================================== */

'use strict';

let trackerData = null;
let currentFilter = 'all';
let currentSort = { col: 'slNo', dir: 1 };

async function initTracker() {
  const resp = await fetch('data/tracker.json');
  trackerData = await resp.json();
  renderTrackerStats(trackerData);
  renderTrackerTable(trackerData.items);
}

function renderTrackerStats(data) {
  const s = data.summary;
  document.getElementById('stat-total').textContent = s.total;
  document.getElementById('stat-completed').textContent = s.completed;
  document.getElementById('stat-scheduled').textContent = s.scheduled;
  document.getElementById('stat-pending').textContent = s.pending;
  document.getElementById('stat-rejected').textContent = s.rejected;

  document.getElementById('tracker-response-date').textContent =
    `TVS response dated ${data.responseDateDisplay}. Meeting confirmed: ${data.meetingConfirmed}.`;
}

function renderTrackerTable(items) {
  const tbody = document.getElementById('tracker-tbody');
  let html = '';

  items.forEach(item => {
    const hidden = (currentFilter !== 'all' && item.status !== currentFilter) ? 'hidden' : '';
    const reversalClass = item.reversalFlag ? 'has-reversal' : '';

    const reversalMini = item.reversalFlag
      ? `<div class="reversal-mini">⚠️ Reversal</div>`
      : '';

    const issueLink = item.issueRef
      ? `<div><a class="issue-link" onclick="showView('issues-view');setTimeout(()=>document.getElementById('issue-${item.issueRef}')?.scrollIntoView({behavior:'smooth'}),200)" href="#">
          → Issue #${item.issueRef}
        </a></div>`
      : '';

    const statusPillHtml = makePill(item.status, item.statusLabel);

    html += `
      <tr class="tracker-row status-${item.status} ${reversalClass}" ${hidden} data-status="${item.status}" data-sl="${item.slNo}">
        <td class="col-no">${item.slNo}</td>
        <td class="col-concern">
          ${esc(item.concern)}
          ${reversalMini}
          ${issueLink}
        </td>
        <td class="col-response">${esc(item.response)}</td>
        <td class="col-timeline">${esc(item.timeline)}</td>
        <td class="col-status">${statusPillHtml}</td>
      </tr>
    `;

    // Reversal detail row
    if (item.reversalFlag && item.reversalNote) {
      html += `
        <tr class="tracker-row has-reversal" ${hidden} data-status="${item.status}">
          <td></td>
          <td colspan="4">
            <div class="reversal-flag" style="margin:0 0 0.5rem 0;">
              <div class="reversal-header"><span class="reversal-icon">⚠️</span> POSITION REVERSAL / BROKEN COMMITMENT</div>
              <div>${esc(item.reversalNote)}</div>
            </div>
          </td>
        </tr>
      `;
    }
  });

  tbody.innerHTML = html || '<tr><td colspan="5" class="empty-state">No items match this filter.</td></tr>';
}

function makePill(status, label) {
  const map = {
    completed: { cls: 'pill-completed', icon: '✅' },
    scheduled: { cls: 'pill-scheduled', icon: '📅' },
    pending:   { cls: 'pill-pending',   icon: '❓' },
    rejected:  { cls: 'pill-rejected',  icon: '🚫' }
  };
  const s = map[status] || map.pending;
  return `<span class="status-pill ${s.cls}">${s.icon} ${esc(label)}</span>`;
}

function applyFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  // Show/hide rows
  const rows = document.querySelectorAll('#tracker-tbody .tracker-row');
  rows.forEach(row => {
    if (filter === 'all' || row.dataset.status === filter) {
      row.removeAttribute('hidden');
    } else {
      row.setAttribute('hidden', '');
    }
  });
}

function applySort(col) {
  if (currentSort.col === col) {
    currentSort.dir *= -1;
  } else {
    currentSort.col = col;
    currentSort.dir = 1;
  }

  const sorted = [...trackerData.items].sort((a, b) => {
    let va = a[col], vb = b[col];
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return -1 * currentSort.dir;
    if (va > vb) return 1 * currentSort.dir;
    return 0;
  });

  renderTrackerTable(sorted);
  applyFilter(currentFilter);

  // Update sort icons
  document.querySelectorAll('.sort-icon').forEach(ic => ic.textContent = '⇅');
  const header = document.querySelector(`th[data-col="${col}"] .sort-icon`);
  if (header) header.textContent = currentSort.dir === 1 ? '↑' : '↓';
}

function esc(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Wire up filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});

// Wire up sort headers
document.querySelectorAll('th[data-col]').forEach(th => {
  th.addEventListener('click', () => applySort(th.dataset.col));
});

window.initTracker = initTracker;
window.applyFilter = applyFilter;
