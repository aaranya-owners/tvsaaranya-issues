/* =====================================================
   site.js — Aaranya tracker & handover site (Nov 2026)
   Data: window.TRACKER (data/tracker_2026.js, generated from the Excel tracker)
         window.REPORT  (data/report_2026.js, from the tenure report PDF)
   ===================================================== */
'use strict';

(function () {
  const ITEMS = (window.TRACKER && window.TRACKER.items) || [];
  const R = window.REPORT || {};
  const byId = new Map(ITEMS.map(i => [i.id, i]));

  // ── Status model ───────────────────────────────────
  const STATUS = {
    completed: { label: 'Completed',                        short: 'Completed',          icon: '✓', group: 'done' },
    verify:    { label: 'Completed – verification pending', short: 'Verify on site',     icon: '◎', group: 'verify' },
    partial:   { label: 'Partially completed',              short: 'Partially completed', icon: '◐', group: 'open' },
    progress:  { label: 'In progress',                      short: 'In progress',        icon: '↻', group: 'open' },
    review:    { label: 'Under review',                     short: 'Under review',       icon: '…', group: 'open' },
    open:      { label: 'Open – follow-up needed',          short: 'Open',               icon: '!', group: 'open' },
    rejected:  { label: 'Rejected / not in TVS scope',      short: 'Rejected by TVS',    icon: '✕', group: 'rejected' }
  };
  const STATUS_ORDER = ['completed', 'verify', 'partial', 'progress', 'review', 'open', 'rejected'];
  const GROUPS = {
    done:     { label: 'Closed',                          cls: 'g-done' },
    verify:   { label: 'Completed, awaiting verification', cls: 'g-verify' },
    open:     { label: 'Open, in progress, partial or under review', cls: 'g-open' },
    rejected: { label: 'Rejected by TVS / out of scope',  cls: 'g-rejected' }
  };
  const GROUP_ORDER = ['done', 'verify', 'open', 'rejected'];
  const PRIORITY_ORDER = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const AREA_ORDER = ['Community', 'Clubhouse', 'OSR 1', 'OSR 2'];

  // ── Helpers ────────────────────────────────────────
  const esc = t => String(t == null ? '' : t)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const $ = (sel, root = document) => root.querySelector(sel);
  const pct = (n, d) => d ? (n / d * 100) : 0;
  const fmtPct = (n, d) => pct(n, d).toFixed(1) + '%';
  const count = pred => ITEMS.filter(pred).length;
  const groupOf = i => STATUS[i.statusKey].group;

  function pill(key) {
    const s = STATUS[key] || STATUS.open;
    return `<span class="pill pill-${key}"><span class="pill-icon" aria-hidden="true">${s.icon}</span>${esc(s.short)}</span>`;
  }
  function prio(p) {
    return `<span class="prio prio-${esc(p.toLowerCase())}">${esc(p)}</span>`;
  }
  function itemLink(id, label) {
    const it = byId.get(id);
    const title = it ? `#${id} ${it.title}` : `#${id}`;
    return `<a class="item-link" href="#tracker/item-${id}" title="${esc(title)}">${esc(label || '#' + id)}</a>`;
  }
  // Turn bare item numbers inside parentheses into links, e.g. "(items 8, 157, 160)".
  function linkifyRefs(text) {
    // Only parentheses that are purely item references: "(8)", "(item 8)", "(see item 6)", "(28, 29, 154)".
    return esc(text).replace(/\(((?:see )?(?:items? )?\d{1,3}(?:,\s*\d{1,3})*)\)/gi, (m, inner) =>
      '(' + inner.replace(/\b(\d{1,3})\b/g, (n, d) => byId.has(+d) ? itemLink(+d, d) : n) + ')');
  }
  const areaLabel = i => i.floor ? `${i.area} · ${i.floor}` : i.area;
  const comment = id => {
    const c = (byId.get(id) || {}).comments;
    return c ? `<span class="comment">${esc(c)}</span>` : '<span class="muted">—</span>';
  };

  // ── Counts ─────────────────────────────────────────
  const total = ITEMS.length;
  const statusCounts = Object.fromEntries(STATUS_ORDER.map(k => [k, count(i => i.statusKey === k)]));
  const groupCounts = Object.fromEntries(GROUP_ORDER.map(g => [g, count(i => groupOf(i) === g)]));

  // ══════════════════════════════════════════════════
  // OVERVIEW
  // ══════════════════════════════════════════════════
  function renderOverview() {
    const done = statusCounts.completed, verify = statusCounts.verify;
    const segs = GROUP_ORDER.map(g => ({ g, n: groupCounts[g] })).filter(s => s.n > 0);

    const segBar = `
      <div class="segbar" role="img" aria-label="${esc(segs.map(s => `${GROUPS[s.g].label}: ${s.n} of ${total} (${fmtPct(s.n, total)})`).join('; '))}">
        ${segs.map(s => `
          <div class="seg ${GROUPS[s.g].cls}" style="flex-grow:${s.n}" tabindex="0"
               title="${esc(GROUPS[s.g].label)}: ${s.n} of ${total} (${fmtPct(s.n, total)})">
            ${pct(s.n, total) >= 6 ? `<span>${Math.round(pct(s.n, total))}%</span>` : ''}
          </div>`).join('')}
      </div>
      <ul class="seg-legend">
        ${segs.map(s => `<li><span class="sw ${GROUPS[s.g].cls}"></span>${esc(GROUPS[s.g].label)} <b>${s.n}</b></li>`).join('')}
      </ul>`;

    const statusTable = `
      <table class="data-table compact">
        <thead><tr><th>Status</th><th class="num">Items</th><th class="num">% of total</th></tr></thead>
        <tbody>
          ${STATUS_ORDER.map(k => `<tr>
            <td>${pill(k)} <span class="status-full">${esc(STATUS[k].label)}</span></td>
            <td class="num">${statusCounts[k]}</td><td class="num">${fmtPct(statusCounts[k], total)}</td></tr>`).join('')}
          <tr class="total-row"><td>Total</td><td class="num">${total}</td><td class="num">100%</td></tr>
        </tbody>
      </table>`;

    const areas = AREA_ORDER.map(a => {
      const logged = count(i => i.area === a);
      const closed = count(i => i.area === a && i.statusKey === 'completed');
      return { a, logged, closed };
    });
    const areaRows = areas.map(x => `
      <div class="area-row">
        <div class="area-head">
          <span class="area-name">${esc(x.a === 'Community' ? 'Community issues' : x.a + ' snag list')}</span>
          <span class="area-num"><b>${x.closed}</b> of ${x.logged} closed</span>
        </div>
        <div class="meter" role="img" aria-label="${x.closed} of ${x.logged} closed"><div class="meter-fill" style="width:${pct(x.closed, x.logged)}%"></div></div>
        <div class="area-covers">${esc((R.areaCovers || {})[x.a] || '')}</div>
      </div>`).join('');

    const critical = (R.critical || []).map((c, n) => `
      <article class="callout callout-critical">
        <div class="callout-tag">4.${n + 1} · ${esc(c.tag)}</div>
        <h3>${esc(c.heading)}</h3>
        <p>${esc(c.text)}</p>
        <p class="callout-action"><strong>${esc(c.action)}</strong> ${esc(c.detail)}</p>
        <div class="callout-links">Tracker items: ${c.items.map(id => itemLink(id)).join(' ')}</div>
      </article>`).join('');

    const first30 = (R.firstSteps || [])[0];

    $('#overview-root').innerHTML = `
      <div class="note">
        <h2 class="note-title">A note to residents</h2>
        ${(R.note || []).map(p => `<p>${esc(p)}</p>`).join('')}
      </div>

      <div class="kpis">
        <div class="kpi kpi-hero"><div class="kpi-num">${total}</div><div class="kpi-label">issues tracked</div></div>
        <div class="kpi"><div class="kpi-num">${done + verify}</div><div class="kpi-label">completed <span class="muted">(${done} closed, ${verify} awaiting verification)</span></div></div>
        <div class="kpi"><div class="kpi-num">${groupCounts.open}</div><div class="kpi-label">open, in progress, partially completed or under review</div></div>
        <div class="kpi"><div class="kpi-num">${groupCounts.rejected}</div><div class="kpi-label">rejected by TVS / out of scope</div></div>
      </div>

      <section class="card">
        <h2 class="card-title">Status at a glance</h2>
        ${segBar}
        <details class="table-toggle" open><summary>Breakdown by status</summary>${statusTable}</details>
        <p class="card-foot"><a href="#tracker">Browse and filter all ${total} issues →</a></p>
      </section>

      <section class="card">
        <h2 class="card-title">Progress by area</h2>
        <div class="areas">${areaRows}</div>
      </section>

      <h2 class="section-title">Critical matters for the next committee</h2>
      <div class="callouts">${critical}</div>

      <div class="two-col">
        <section class="card">
          <h2 class="card-title">${esc(first30 ? 'Suggested first steps — ' + first30.phase : 'First steps')}</h2>
          <ul class="steps">${first30 ? first30.steps.map(s => `<li>${linkifyRefs(s)}</li>`).join('') : ''}</ul>
          <p class="card-foot"><a href="#handover/sec-steps">All recommended steps →</a></p>
        </section>
        <section class="card">
          <h2 class="card-title">Jump to</h2>
          <ul class="jump-list">
            <li><a href="#handover/sec-high">Critical &amp; high priority pending items</a></li>
            <li><a href="#handover/sec-medium">Medium &amp; low priority pending items</a></li>
            <li><a href="#handover/sec-verify">${verify} items awaiting our verification</a></li>
            <li><a href="#handover/sec-rejected">${groupCounts.rejected} items rejected by TVS — decisions needed</a></li>
            <li><a href="#handover/sec-initiatives">Planned initiatives for the new committee</a></li>
            <li><a href="#resolved">What we resolved (${done} items)</a></li>
          </ul>
        </section>
      </div>`;
  }

  // ══════════════════════════════════════════════════
  // HANDOVER
  // ══════════════════════════════════════════════════
  function pendingTable(ids) {
    return `
      <div class="table-wrap">
      <table class="data-table handover-table">
        <thead><tr><th class="c-id">#</th><th class="c-issue">Issue</th><th class="c-status">Status</th><th>Where it stands</th><th class="c-comment">Comments</th></tr></thead>
        <tbody>
          ${ids.map(id => {
            const it = byId.get(id), p = R.pending[id];
            return `<tr class="${p.disputed ? 'row-disputed' : ''}">
              <td class="c-id">${itemLink(id, id)}</td>
              <td class="c-issue"><div class="issue-name">${esc(p.short)}</div>${prio(it.priority)}</td>
              <td class="c-status">${pill(it.statusKey)}${p.disputed ? '<div class="disputed">TVS says complete — not accepted</div>' : ''}</td>
              <td><div>${esc(p.where)}</div><div class="next"><b>Next:</b> ${esc(p.next)}</div></td>
              <td class="c-comment">${comment(id)}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table></div>`;
  }

  function renderHandover() {
    const pendIds = Object.keys(R.pending || {}).map(Number).sort((a, b) => a - b);
    const high = pendIds.filter(id => ['CRITICAL', 'HIGH'].includes(byId.get(id).priority));
    const med = pendIds.filter(id => !['CRITICAL', 'HIGH'].includes(byId.get(id).priority));
    const verifyIds = Object.keys(R.verify || {}).map(Number).sort((a, b) => a - b);
    const rejIds = Object.keys(R.rejected || {}).map(Number).sort((a, b) => a - b);
    const clubPending = ITEMS.filter(i => i.area === 'Clubhouse' && i.statusKey !== 'completed');
    const clubTotal = count(i => i.area === 'Clubhouse');
    const disputed = pendIds.filter(id => R.pending[id].disputed);

    const sections = [
      ['sec-critical', 'Critical matters'], ['sec-high', 'Critical & high'], ['sec-medium', 'Medium & low'],
      ['sec-verify', 'To verify'], ['sec-rejected', 'Rejected by TVS'], ['sec-clubhouse', 'Clubhouse snags'],
      ['sec-initiatives', 'Initiatives'], ['sec-steps', 'First steps']
    ];

    $('#handover-root').innerHTML = `
      <nav class="subnav" aria-label="On this page">
        ${sections.map(([id, l]) => `<a href="#handover/${id}">${esc(l)}</a>`).join('')}
      </nav>

      <p class="lead">${esc(R.pendingNote)}</p>

      <section id="sec-critical" class="anchor">
        <h2 class="section-title">Critical matters for the next committee</h2>
        <div class="callouts">
          ${(R.critical || []).map(c => `
            <article class="callout callout-critical">
              <div class="callout-tag">${esc(c.tag)}</div>
              <h3>${esc(c.heading)}</h3>
              <p>${esc(c.text)}</p>
              <p class="callout-action"><strong>${esc(c.action)}</strong> ${esc(c.detail)}</p>
              <div class="callout-links">Tracker items: ${c.items.map(id => itemLink(id)).join(' ')}</div>
            </article>`).join('')}
        </div>
      </section>

      <section id="sec-high" class="anchor">
        <h2 class="section-title">Pending — critical and high priority <span class="count">${high.length}</span></h2>
        <p class="section-note">Critical and high-priority items that TVS has rejected (${rejIds.filter(id => ['CRITICAL','HIGH'].includes(byId.get(id).priority)).map(id => itemLink(id, id)).join(', ')}) are listed under <a href="#handover/sec-rejected">Rejected by TVS</a>.</p>
        ${pendingTable(high)}
      </section>

      <section id="sec-medium" class="anchor">
        <h2 class="section-title">Pending — medium and low priority <span class="count">${med.length}</span></h2>
        <p class="section-note">Items ${disputed.map(id => itemLink(id, id)).join(', ')} are ones where TVS reports the work as complete but the Association has not accepted it. Do not close these until they are inspected.</p>
        ${pendingTable(med)}
      </section>

      <section id="sec-verify" class="anchor">
        <h2 class="section-title">Completed by TVS, awaiting our verification <span class="count">${verifyIds.length}</span></h2>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th class="c-id">#</th><th class="c-issue">Item</th><th>What to check</th><th class="c-comment">Comments</th></tr></thead>
          <tbody>${verifyIds.map(id => `<tr>
            <td class="c-id">${itemLink(id, id)}</td>
            <td class="c-issue"><div class="issue-name">${esc(R.verify[id].short)}</div>${prio(byId.get(id).priority)}</td>
            <td>${esc(R.verify[id].check)}</td><td class="c-comment">${comment(id)}</td></tr>`).join('')}
          </tbody></table></div>
      </section>

      <section id="sec-rejected" class="anchor">
        <h2 class="section-title">Items rejected by TVS <span class="count">${rejIds.length}</span></h2>
        <p class="section-note">${esc(R.rejectedNote)}</p>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th class="c-id">#</th><th class="c-issue">Issue</th><th>TVS position</th><th>Suggested decision</th><th class="c-comment">Comments</th></tr></thead>
          <tbody>${rejIds.map(id => { const r = R.rejected[id]; return `<tr class="${r.safety ? 'row-safety' : ''}">
            <td class="c-id">${itemLink(id, id)}</td>
            <td class="c-issue"><div class="issue-name">${esc(r.short)}</div>${prio(byId.get(id).priority)}</td>
            <td>${esc(r.position)}</td>
            <td>${r.safety ? '<span class="safety-flag">Safety</span> ' : ''}${linkifyRefs(r.decision)}</td>
            <td class="c-comment">${comment(id)}</td></tr>`; }).join('')}
          </tbody></table></div>
      </section>

      <section id="sec-clubhouse" class="anchor">
        <h2 class="section-title">Pending clubhouse snags <span class="count">${clubPending.length}</span></h2>
        <p class="section-note">${clubTotal - clubPending.length} of the ${clubTotal} clubhouse defects are now closed. ${clubPending.length} remain:</p>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th class="c-id">#</th><th>Pending defect</th><th>Floor</th><th class="c-status">Status</th><th>Priority</th></tr></thead>
          <tbody>${clubPending.map(i => `<tr>
            <td class="c-id">${itemLink(i.id, i.id)}</td><td>${esc(i.title)}${i.detail ? ' (' + esc(i.detail) + ')' : ''}</td>
            <td>${esc(i.floor)}</td><td class="c-status">${pill(i.statusKey)}</td><td>${prio(i.priority)}</td></tr>`).join('')}
          </tbody></table></div>
        <p class="section-note">Pending OSR 1 items (basketball court patches and skirting wall, uneven stones) are listed in the pending tables above.</p>
      </section>

      <section id="sec-initiatives" class="anchor">
        <h2 class="section-title">Planned initiatives for the new committee to consider</h2>
        <p class="section-note">${esc(R.initiativesNote)}</p>
        <ol class="initiatives">
          ${(R.initiatives || []).map(x => `<li class="card initiative">
            <h3>${esc(x.title)} ${x.blocked ? '<span class="blocked">Blocked by registration delay</span>' : ''}</h3>
            <p>${esc(x.text)}</p></li>`).join('')}
        </ol>
      </section>

      <section id="sec-steps" class="anchor">
        <h2 class="section-title">Suggested first steps for the new committee</h2>
        <p class="section-note">These are our recommendations, drawn from the tracker.</p>
        <div class="phases">
          ${(R.firstSteps || []).map(ph => `<div class="card phase">
            <h3>${esc(ph.phase)}</h3>
            <ul class="steps">${ph.steps.map(s => `<li>${linkifyRefs(s)}</li>`).join('')}</ul></div>`).join('')}
        </div>
        <blockquote class="signoff">${esc(R.signoff)}<cite>— ${esc(R.signedBy)}</cite></blockquote>
      </section>`;
  }

  // ══════════════════════════════════════════════════
  // TRACKER (all 174)
  // ══════════════════════════════════════════════════
  const state = { q: '', group: 'all', priority: 'all', area: 'all', type: 'all' };

  function handoverNote(id) {
    if (R.pending && R.pending[id]) return `<div class="field field-note"><div class="field-label">Handover note (Nov 2026)</div><div>${esc(R.pending[id].where)}</div><div class="next"><b>Next:</b> ${esc(R.pending[id].next)}</div></div>`;
    if (R.verify && R.verify[id]) return `<div class="field field-note"><div class="field-label">Handover note (Nov 2026)</div><div>${esc(R.verify[id].check)}</div></div>`;
    if (R.rejected && R.rejected[id]) return `<div class="field field-note"><div class="field-label">Handover note (Nov 2026)</div><div><b>TVS position:</b> ${esc(R.rejected[id].position)}</div><div class="next"><b>Suggested decision:</b> ${esc(R.rejected[id].decision)}</div></div>`;
    return '';
  }

  function field(label, val) {
    return val ? `<div class="field"><div class="field-label">${esc(label)}</div><div class="field-val">${esc(val)}</div></div>` : '';
  }

  function itemRow(i) {
    return `
      <details class="issue g-${groupOf(i)}" id="item-${i.id}" data-id="${i.id}">
        <summary>
          <span class="issue-id">#${i.id}</span>
          <span class="issue-main">
            <span class="issue-title">${esc(i.title)}</span>
            <span class="issue-meta"><span class="meta-area">${esc(areaLabel(i))}</span><span class="meta-type">${esc(i.type)}</span></span>
          </span>
          <span class="issue-status">${pill(i.statusKey)}</span>
        </summary>
        <div class="issue-body">
          ${handoverNote(i.id)}
          ${field('Problem', i.detail)}
          ${field('Impact', i.impact)}
          ${field('Fix requested', i.fix)}
          ${field('TVS response (Jul 2026)', i.tvsJul2026)}
          ${field('TVS response during meeting (03/06/2026)', i.tvsMeeting)}
          ${field('Association comments', i.comments)}
          ${!i.detail && !i.impact && !i.fix && !i.tvsJul2026 && !i.tvsMeeting && !i.comments && !handoverNote(i.id) ? '<p class="muted">No further detail recorded in the tracker.</p>' : ''}
          <div class="field-status">Status: <b>${esc(i.status)}</b> · Category: ${esc(i.category)}</div>
        </div>
      </details>`;
  }

  function matches(i) {
    if (state.group !== 'all' && groupOf(i) !== state.group) return false;
    if (state.priority !== 'all' && i.priority !== state.priority) return false;
    if (state.area !== 'all' && i.area !== state.area) return false;
    if (state.type !== 'all' && i.type !== state.type) return false;
    if (state.q) {
      const q = state.q.toLowerCase();
      if (/^#?\d+$/.test(q)) return String(i.id) === q.replace('#', '');
      const hay = [i.title, i.detail, i.impact, i.fix, i.tvsJul2026, i.tvsMeeting, i.comments, i.area, i.floor, i.status].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function renderTrackerShell() {
    const types = [...new Set(ITEMS.map(i => i.type))].sort();
    const opt = (v, l) => `<option value="${esc(v)}">${esc(l)}</option>`;
    $('#tracker-root').innerHTML = `
      <div class="filters">
        <div class="chips" role="group" aria-label="Filter by status">
          <button class="chip active" data-group="all">All <b>${total}</b></button>
          ${GROUP_ORDER.map(g => `<button class="chip chip-${g}" data-group="${g}"><span class="sw ${GROUPS[g].cls}"></span>${esc({done:'Closed',verify:'Awaiting verification',open:'Open / in progress',rejected:'Rejected by TVS'}[g])} <b>${groupCounts[g]}</b></button>`).join('')}
        </div>
        <div class="filter-row">
          <label class="search"><span class="sr-only">Search</span>
            <input type="search" id="f-q" placeholder="Search issues, responses, comments or #number…" autocomplete="off"></label>
          <select id="f-priority" aria-label="Priority">${opt('all', 'All priorities')}${PRIORITY_ORDER.map(p => opt(p, p.charAt(0) + p.slice(1).toLowerCase())).join('')}</select>
          <select id="f-area" aria-label="Area">${opt('all', 'All areas')}${AREA_ORDER.map(a => opt(a, a)).join('')}</select>
          <select id="f-type" aria-label="Issue type">${opt('all', 'All issue types')}${types.map(t => opt(t, t)).join('')}</select>
          <button class="btn-ghost" id="f-expand">Expand all</button>
          <button class="btn-ghost" id="f-reset">Reset</button>
        </div>
        <div class="result-count" id="f-count" aria-live="polite"></div>
      </div>
      <div class="issue-list" id="issue-list"></div>`;

    const root = $('#tracker-root');
    root.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => {
      state.group = b.dataset.group; renderList();
    }));
    $('#f-q').addEventListener('input', e => { state.q = e.target.value.trim(); renderList(); });
    $('#f-priority').addEventListener('change', e => { state.priority = e.target.value; renderList(); });
    $('#f-area').addEventListener('change', e => { state.area = e.target.value; renderList(); });
    $('#f-type').addEventListener('change', e => { state.type = e.target.value; renderList(); });
    $('#f-reset').addEventListener('click', resetFilters);
    $('#f-expand').addEventListener('click', e => {
      const list = [...document.querySelectorAll('#issue-list details')];
      const open = !list.every(d => d.open);
      list.forEach(d => { d.open = open; });
      e.target.textContent = open ? 'Collapse all' : 'Expand all';
    });
  }

  function resetFilters() {
    Object.assign(state, { q: '', group: 'all', priority: 'all', area: 'all', type: 'all' });
    $('#f-q').value = ''; $('#f-priority').value = 'all'; $('#f-area').value = 'all'; $('#f-type').value = 'all';
    renderList();
  }

  function renderList() {
    document.querySelectorAll('#tracker-root .chip').forEach(b => b.classList.toggle('active', b.dataset.group === state.group));
    const shown = ITEMS.filter(matches);
    let html = '', lastP = null;
    shown.forEach(i => {
      if (i.priority !== lastP) {
        lastP = i.priority;
        html += `<h3 class="prio-heading">${prio(i.priority)} <span>${shown.filter(x => x.priority === i.priority).length} items</span></h3>`;
      }
      html += itemRow(i);
    });
    $('#issue-list').innerHTML = html || '<p class="empty">No issues match these filters. <button class="btn-link" id="f-reset2">Reset filters</button></p>';
    const r2 = $('#f-reset2'); if (r2) r2.addEventListener('click', resetFilters);
    $('#f-count').textContent = shown.length === total ? `Showing all ${total} issues` : `Showing ${shown.length} of ${total} issues`;
    $('#f-expand').textContent = 'Expand all';
  }

  function focusItem(id) {
    if (!byId.has(id)) return;
    if (!ITEMS.filter(matches).some(i => i.id === id)) resetFilters();
    const el = document.getElementById('item-' + id);
    if (!el) return;
    el.open = true;
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1800);
    { const behavior = firstRoute ? 'auto' : 'smooth'; requestAnimationFrame(() => el.scrollIntoView({ behavior, block: 'start' })); }
  }

  // ══════════════════════════════════════════════════
  // RESOLVED
  // ══════════════════════════════════════════════════
  function renderResolved() {
    const done = ITEMS.filter(i => i.statusKey === 'completed');
    const highlights = (R.resolved || []).map(r => `
      <article class="card win ${r.major ? 'win-major' : ''}">
        ${r.major ? '<span class="win-tag">Major work</span>' : ''}
        <h3>${esc(r.title)}</h3><p>${linkifyRefs(r.text)}</p>
      </article>`).join('');

    const groups = AREA_ORDER.map(a => {
      const list = done.filter(i => i.area === a);
      if (!list.length) return '';
      return `
        <details class="resolved-group" ${a === 'Community' ? 'open' : ''}>
          <summary><span>${esc(a === 'Community' ? 'Community issues' : a + ' snag list')}</span> <b>${list.length}</b> resolved of ${count(i => i.area === a)}</summary>
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th class="c-id">#</th><th>Item</th>${a === 'Clubhouse' ? '<th>Floor</th>' : ''}<th>Priority</th><th class="c-comment">Comments</th></tr></thead>
            <tbody>${list.map(i => `<tr>
              <td class="c-id">${itemLink(i.id, i.id)}</td><td>${esc(i.title)}</td>
              ${a === 'Clubhouse' ? `<td>${esc(i.floor)}</td>` : ''}
              <td>${prio(i.priority)}</td><td class="c-comment">${comment(i.id)}</td></tr>`).join('')}
            </tbody></table></div>
        </details>`;
    }).join('');

    $('#resolved-root').innerHTML = `
      <p class="lead">Of the ${total} concerns raised, ${done.length} have been resolved and ${statusCounts.verify} are reported complete by TVS, awaiting our verification. The key items resolved, by area:</p>
      <div class="wins">${highlights}</div>
      <h2 class="section-title">All ${done.length} resolved items</h2>
      <p class="section-note">Item numbers match the updated tracker, which is numbered by priority and then by status.</p>
      ${groups}`;
  }

  // ══════════════════════════════════════════════════
  // ROUTER
  // ══════════════════════════════════════════════════
  const VIEWS = ['overview', 'handover', 'tracker', 'resolved'];
  let firstRoute = true;
  function route() {
    setTimeout(() => { firstRoute = false; }, 0);
    const [view, sub] = (location.hash.replace(/^#/, '') || 'overview').split('/');
    const v = VIEWS.includes(view) ? view : 'overview';
    document.querySelectorAll('.view').forEach(el => el.classList.toggle('active', el.id === 'view-' + v));
    document.querySelectorAll('.nav-tab').forEach(t => {
      const on = t.dataset.view === v;
      t.classList.toggle('active', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    if (v === 'tracker' && sub && sub.startsWith('item-')) { focusItem(parseInt(sub.slice(5), 10)); return; }
    if (sub) {
      const el = document.getElementById(sub);
      if (el) { const behavior = firstRoute ? 'auto' : 'smooth'; requestAnimationFrame(() => el.scrollIntoView({ behavior, block: 'start' })); return; }
    }
    window.scrollTo({ top: 0 });
  }

  function init() {
    if (!ITEMS.length) {
      document.querySelector('main').innerHTML = '<p class="empty">Tracker data failed to load (data/tracker_2026.js).</p>';
      return;
    }
    renderOverview();
    renderHandover();
    renderTrackerShell();
    renderList();
    renderResolved();
    window.addEventListener('hashchange', route);
    route();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
