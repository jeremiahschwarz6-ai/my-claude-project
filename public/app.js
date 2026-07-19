// FounderFit frontend — vanilla JS, talks to the Express API.

const $ = (sel) => document.querySelector(sel);

async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

function esc(s) {
  const div = document.createElement("div");
  div.textContent = String(s ?? "");
  return div.innerHTML;
}

// --- Tabs -------------------------------------------------------------------

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    $(`#tab-${btn.dataset.tab}`).classList.add("active");
  });
});

// --- Modal ------------------------------------------------------------------

function openModal(html) {
  $("#modal-content").innerHTML = html;
  $("#modal").classList.remove("hidden");
}
$("#modal-close").addEventListener("click", () => $("#modal").classList.add("hidden"));
$("#modal").addEventListener("click", (e) => {
  if (e.target === $("#modal")) $("#modal").classList.add("hidden");
});

// --- Founder quiz -----------------------------------------------------------

$("#quiz-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  btn.disabled = true;
  $("#quiz-result").innerHTML =
    `<div class="card"><span class="spinner"></span> Analyzing your answers…</div>`;
  try {
    const answers = Object.fromEntries(new FormData(e.target));
    const r = await api("/api/recommendations", {
      method: "POST",
      body: JSON.stringify(answers),
    });
    $("#quiz-result").innerHTML = `
      <div class="card result-card">
        <h3>Recommended: <span class="badge good">${esc(r.recommendedModel)}</span>
          &nbsp;runner-up: <span class="badge">${esc(r.runnerUpModel)}</span></h3>
        <p>${esc(r.reasoning)}</p>
        <strong>Your first 30 days</strong>
        <ul>${r.firstSteps.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        <strong>Risks to watch</strong>
        <ul>${r.risksToWatch.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        <p class="source-note">${r.source === "ai" ? "Analysis by Claude" : "Built-in heuristic (no API key configured)"}</p>
      </div>`;
  } catch (err) {
    $("#quiz-result").innerHTML = `<div class="card"><strong>Error:</strong> ${esc(err.message)}</div>`;
  } finally {
    btn.disabled = false;
  }
});

// --- Startups ---------------------------------------------------------------

async function loadStartups() {
  const startups = await api("/api/startups");
  $("#startup-list").innerHTML = startups
    .map(
      (s) => `
      <div class="card">
        <h4>${esc(s.name)}</h4>
        <div class="meta">
          <span class="badge">${esc(s.businessModel)}</span>
          <span class="badge warn">${esc(s.stage)}</span>
          ${esc(s.sector)}
        </div>
        <div class="pitch">${esc(s.pitch)}</div>
        <div class="meta">
          $${Number(s.monthlyRevenue).toLocaleString()}/mo ·
          ${esc(s.monthlyGrowthPct)}% growth ·
          raising $${Number(s.askAmount).toLocaleString()}
        </div>
        <button class="ghost" data-analyze="${s.id}">Run AI analysis</button>
      </div>`
    )
    .join("");

  document.querySelectorAll("[data-analyze]").forEach((btn) => {
    btn.addEventListener("click", () => analyzeStartup(btn.dataset.analyze));
  });

  const startupSelect = $("#deal-startup");
  startupSelect.innerHTML = startups
    .map((s) => `<option value="${s.id}">${esc(s.name)}</option>`)
    .join("");
}

$("#startup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await api("/api/startups", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    });
    e.target.reset();
    await loadStartups();
  } catch (err) {
    alert(err.message);
  }
});

// --- AI analysis ------------------------------------------------------------

const VERDICT_BADGE = {
  "strong-yes": "good",
  "worth-a-meeting": "good",
  watch: "warn",
  pass: "bad",
};

async function analyzeStartup(startupId) {
  const investors = await api("/api/investors");
  const options = investors
    .map((i) => `<option value="${i.id}">${esc(i.name)}</option>`)
    .join("");
  openModal(`
    <h3>AI investment analysis</h3>
    <label>Analyze as investor:
      <select id="analyze-investor"><option value="">(no investor lens)</option>${options}</select>
    </label>
    <p><button id="analyze-go" class="primary">Generate memo</button></p>
    <div id="analyze-out"></div>
  `);
  $("#analyze-go").addEventListener("click", async () => {
    const out = $("#analyze-out");
    $("#analyze-go").disabled = true;
    out.innerHTML = `<span class="spinner"></span> Writing first-pass memo — this can take a minute…`;
    try {
      const investorId = $("#analyze-investor").value || undefined;
      const a = await api(`/api/startups/${startupId}/analyze`, {
        method: "POST",
        body: JSON.stringify({ investorId }),
      });
      out.innerHTML = `
        <div class="result-card card">
          <div class="score">${a.score}/10
            <span class="badge ${VERDICT_BADGE[a.verdict] || ""}">${esc(a.verdict)}</span>
          </div>
          <p>${esc(a.summary)}</p>
          <strong>Strengths</strong>
          <ul>${a.strengths.map((s) => `<li>${esc(s)}</li>`).join("") || "<li>—</li>"}</ul>
          <strong>Risks</strong>
          <ul>${a.risks.map((s) => `<li>${esc(s)}</li>`).join("") || "<li>—</li>"}</ul>
          <strong>Questions for the founder</strong>
          <ul>${a.questionsForFounder.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          <strong>Thesis fit</strong>
          <p>${esc(a.thesisFit)}</p>
          <p class="source-note">${a.source === "ai" ? "Memo by Claude — a first-pass screen, not investment advice." : "Built-in heuristic (no API key configured)."}</p>
        </div>`;
    } catch (err) {
      out.innerHTML = `<strong>Error:</strong> ${esc(err.message)}`;
    } finally {
      $("#analyze-go").disabled = false;
    }
  });
}

// --- Investors --------------------------------------------------------------

async function loadInvestors() {
  const investors = await api("/api/investors");
  $("#investor-list").innerHTML = investors
    .map(
      (i) => `
      <div class="card">
        <h4>${esc(i.name)}</h4>
        <div class="pitch">${esc(i.thesis)}</div>
        <div class="meta">${(i.sectors || []).map((s) => `<span class="badge">${esc(s)}</span>`).join(" ")}</div>
        <div class="meta">${esc(i.contact)}</div>
      </div>`
    )
    .join("");

  const investorSelect = $("#deal-investor");
  investorSelect.innerHTML = investors
    .map((i) => `<option value="${i.id}">${esc(i.name)}</option>`)
    .join("");
}

$("#investor-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.sectors = data.sectors
    ? data.sectors.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  try {
    await api("/api/investors", { method: "POST", body: JSON.stringify(data) });
    e.target.reset();
    await loadInvestors();
  } catch (err) {
    alert(err.message);
  }
});

// --- Deals ------------------------------------------------------------------

async function loadDeals() {
  const { platformFeePct, deals } = await api("/api/deals");
  if (!deals.length) {
    $("#deal-list").innerHTML = `<p class="muted">No deals yet. Open one above — FounderFit takes ${platformFeePct}% only when it closes.</p>`;
    return;
  }
  $("#deal-list").innerHTML = `
    <table>
      <thead><tr><th>Startup</th><th>Investor</th><th>Amount</th><th>Status</th><th>Platform fee (${platformFeePct}%)</th></tr></thead>
      <tbody>
        ${deals
          .map(
            (d) => `
          <tr>
            <td>${esc(d.startup)}</td>
            <td>${esc(d.investor)}</td>
            <td>$${Number(d.amount).toLocaleString()}</td>
            <td>
              <select data-deal="${d.id}">
                ${["interested", "in_diligence", "closed", "passed"]
                  .map((s) => `<option value="${s}" ${s === d.status ? "selected" : ""}>${s.replace("_", " ")}</option>`)
                  .join("")}
              </select>
            </td>
            <td>${d.platformFee != null ? `<strong>$${Number(d.platformFee).toLocaleString()}</strong>` : "—"}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;

  document.querySelectorAll("[data-deal]").forEach((sel) => {
    sel.addEventListener("change", async () => {
      try {
        await api(`/api/deals/${sel.dataset.deal}`, {
          method: "PATCH",
          body: JSON.stringify({ status: sel.value }),
        });
        await loadDeals();
      } catch (err) {
        alert(err.message);
      }
    });
  });
}

$("#deal-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await api("/api/deals", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    });
    e.target.reset();
    await loadDeals();
  } catch (err) {
    alert(err.message);
  }
});

// --- Init -------------------------------------------------------------------

loadStartups();
loadInvestors();
loadDeals();
