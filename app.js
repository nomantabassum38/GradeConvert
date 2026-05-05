// I18N Dictionary
const i18n = {
  en: {
    nav_convert: 'Convert', nav_how: 'How it works', nav_systems: 'Systems',
    hero_tag: 'Universal Grade Converter', hero_title_1: 'Convert any grade', hero_title_2: 'to any other scale.',
    hero_sub: '25+ countries supported. Includes the modified Bavarian formula for German universities, and precise linear mapping for all other international systems.',
    hero_cta: 'Start converting', conv_title: 'Grade Converter',
    conv_sub: 'Select your source and target grading systems, enter your grade, and get an instant conversion.',
    label_from: 'From System', label_to: 'To System', label_min: 'Min grade', label_worst: '(worst)',
    label_max: 'Max grade', label_best: '(best)', label_obtained: 'Your obtained grade', btn_convert: 'Convert grade',
    res_empty: 'Your converted grade will appear here', res_pos: 'Position on target scale',
    lbl_best: 'Best', lbl_avg: 'Avg', lbl_worst: 'Worst', meta_orig: 'Original grade', meta_pct: 'Percentile',
    meta_ects: 'Approx. ECTS', meta_status: 'Status', formula_lbl: 'Conversion formula applied',
    btn_copy: 'Copy', btn_add: 'Add to Transcript', trans_title: 'Your Transcript', btn_clear: 'Clear',
    btn_csv: 'Export CSV', btn_pdf: 'Save PDF', th_course: 'Course / Item', th_source: 'Source Grade',
    th_target: 'Target Grade', th_status: 'Status', footer_desc: 'Free, open-source universal grade conversion tool.<br/>For academic use. Always verify with your institution.',
    footer_bot: 'Built with care · No data stored · MIT License'
  },
  de: {
    nav_convert: 'Umrechnen', nav_how: 'Wie es funktioniert', nav_systems: 'Systeme',
    hero_tag: 'Universeller Notenrechner', hero_title_1: 'Rechne jede Note', hero_title_2: 'in ein anderes System um.',
    hero_sub: 'Mehr als 25 Länder unterstützt. Beinhaltet die modifizierte bayerische Formel für deutsche Universitäten und präzises lineares Mapping für alle anderen Systeme.',
    hero_cta: 'Jetzt umrechnen', conv_title: 'Notenrechner',
    conv_sub: 'Wähle Ausgangs- und Zielsystem, gib deine Note ein und erhalte sofort das Ergebnis.',
    label_from: 'Ausgangssystem', label_to: 'Zielsystem', label_min: 'Min Note', label_worst: '(schlechteste)',
    label_max: 'Max Note', label_best: '(beste)', label_obtained: 'Deine Note', btn_convert: 'Note umrechnen',
    res_empty: 'Deine umgerechnete Note erscheint hier', res_pos: 'Position auf der Zielskala',
    lbl_best: 'Beste', lbl_avg: 'Durch.', lbl_worst: 'Schl.', meta_orig: 'Originalnote', meta_pct: 'Perzentil',
    meta_ects: 'Ungefähr ECTS', meta_status: 'Status', formula_lbl: 'Angewandte Formel',
    btn_copy: 'Kopieren', btn_add: 'Zum Zeugnis hinzufügen', trans_title: 'Dein Zeugnis', btn_clear: 'Leeren',
    btn_csv: 'CSV Export', btn_pdf: 'PDF Speichern', th_course: 'Kurs / Modul', th_source: 'Originalnote',
    th_target: 'Zielnote', th_status: 'Status', footer_desc: 'Kostenloses, Open-Source Universal-Notenrechner-Tool.<br/>Für akademische Zwecke. Immer mit der Hochschule abgleichen.',
    footer_bot: 'Mit Sorgfalt erstellt · Keine Datenspeicherung · MIT Lizenz'
  }
};

let currentLang = 'en';

// DB
const SYSTEMS = {
  // Europe
  germany: { min: 4, max: 1, inverted: true, label: 'Germany (1-5)', note: 'Lower is better. 1 = best, 4 = lowest pass.' },
  germany_abitur: { min: 0, max: 15, inverted: false, label: 'Germany Abitur (0-15)', note: 'Higher is better. 15 = best.' },
  italy_exam: { min: 18, max: 30, inverted: false, label: 'Italy Exam (18-30)', note: 'Higher is better. 30 = best.' },
  italy_degree: { min: 66, max: 110, inverted: false, label: 'Italy Degree (66-110)', note: 'Higher is better. 110 = best.' },
  uk: { min: 40, max: 100, inverted: false, label: 'UK Percentage (40-100%)', note: 'Higher is better. 100% = best, 40% = passing.' },
  france: { min: 10, max: 20, inverted: false, label: 'France (10-20)', note: 'Higher is better. 20 = best, 10 = passing.' },
  netherlands: { min: 5.5, max: 10, inverted: false, label: 'Netherlands (1-10)', note: 'Higher is better. 10 = best, 5.5 = passing.' },
  spain: { min: 5, max: 10, inverted: false, label: 'Spain (0-10)', note: 'Higher is better. 10 = best, 5 = passing.' },
  switzerland: { min: 4, max: 6, inverted: false, label: 'Switzerland (1-6)', note: 'Higher is better. 6 = best, 4 = passing.' },
  austria: { min: 4, max: 1, inverted: true, label: 'Austria (1-5)', note: 'Lower is better. 1 = best, 4 = passing.' },
  sweden: { min: 3, max: 5, inverted: false, label: 'Sweden (0-5)', note: 'Higher is better. 5 = best, 3 = passing.' },
  russia: { min: 3, max: 5, inverted: false, label: 'Russia (2-5)', note: 'Higher is better. 5 = best, 3 = passing.' },
  denmark: { min: 2, max: 12, inverted: false, label: 'Denmark (-3 to 12)', note: 'Higher is better. 12 = best, 2 = passing.' },
  belgium: { min: 10, max: 20, inverted: false, label: 'Belgium (0-20)', note: 'Higher is better. 20 = best, 10 = passing.' },
  poland: { min: 3, max: 5, inverted: false, label: 'Poland (2-5)', note: 'Higher is better. 5 = best, 3 = passing.' },
  
  // Asia & Pacific
  pakistan_pct: { min: 50, max: 100, inverted: false, label: 'Pakistan (0-100%)', note: 'Higher is better. 100% = best.' },
  pakistan_gpa: { min: 2.0, max: 4.0, inverted: false, label: 'Pakistan GPA (0.0-4.0)', note: 'Higher is better. 4.0 = best.' },
  india_pct: { min: 40, max: 100, inverted: false, label: 'India (0-100%)', note: 'Higher is better. 100% = best.' },
  india_cgpa: { min: 4.0, max: 10.0, inverted: false, label: 'India CGPA (0.0-10.0)', note: 'Higher is better. 10.0 = best.' },
  china_pct: { min: 60, max: 100, inverted: false, label: 'China (0-100%)', note: 'Higher is better. 100 = best, 60 = pass.' },
  china_gpa: { min: 1.0, max: 5.0, inverted: false, label: 'China GPA (0.0-5.0)', note: 'Higher is better. 5.0 = best.' },
  japan_pct: { min: 60, max: 100, inverted: false, label: 'Japan (0-100%)', note: 'Higher is better. 100 = best.' },
  japan_gpa: { min: 1.0, max: 4.0, inverted: false, label: 'Japan GPA (0.0-4.0)', note: 'Higher is better. 4.0 = best.' },
  korea_pct: { min: 60, max: 100, inverted: false, label: 'South Korea (0-100%)', note: 'Higher is better. 100% = best.' },
  korea_43: { min: 1.0, max: 4.3, inverted: false, label: 'South Korea GPA (0.0-4.3)', note: 'Higher is better. 4.3 = best.' },
  korea_45: { min: 1.0, max: 4.5, inverted: false, label: 'South Korea GPA (0.0-4.5)', note: 'Higher is better. 4.5 = best.' },
  australia_pct: { min: 50, max: 100, inverted: false, label: 'Australia (0-100%)', note: 'Higher is better. 100% = best.' },
  australia_gpa: { min: 4.0, max: 7.0, inverted: false, label: 'Australia GPA (0.0-7.0)', note: 'Higher is better. 7.0 = best.' },
  iran: { min: 10, max: 20, inverted: false, label: 'Iran (0-20)', note: 'Higher is better. 20 = best, 10 = passing.' },
  turkey_pct: { min: 50, max: 100, inverted: false, label: 'Turkey (0-100%)', note: 'Higher is better. 100% = best.' },
  turkey_gpa: { min: 2.0, max: 4.0, inverted: false, label: 'Turkey GPA (0.0-4.0)', note: 'Higher is better. 4.0 = best.' },
  saudi_4: { min: 2.0, max: 4.0, inverted: false, label: 'Saudi Arabia GPA (0.0-4.0)', note: 'Higher is better. 4.0 = best.' },
  saudi_5: { min: 3.0, max: 5.0, inverted: false, label: 'Saudi Arabia GPA (0.0-5.0)', note: 'Higher is better. 5.0 = best.' },

  // Americas
  usa_gpa: { min: 1.0, max: 4.0, inverted: false, label: 'US GPA (0.0-4.0)', note: 'Higher is better. 4.0 = best.' },
  usa_pct: { min: 60, max: 100, inverted: false, label: 'US Percentage (0-100%)', note: 'Higher is better. 100% = best.' },
  canada_4: { min: 1.0, max: 4.0, inverted: false, label: 'Canada GPA (0.0-4.0)', note: 'Higher is better. 4.0 = best.' },
  canada_43: { min: 1.0, max: 4.3, inverted: false, label: 'Canada GPA (0.0-4.3)', note: 'Higher is better. 4.3 = best.' },
  canada_9: { min: 4.0, max: 9.0, inverted: false, label: 'Canada GPA (0.0-9.0)', note: 'Higher is better. 9.0 = best.' },
  canada_pct: { min: 50, max: 100, inverted: false, label: 'Canada Percentage', note: 'Higher is better. 100% = best.' },
  brazil: { min: 5, max: 10, inverted: false, label: 'Brazil (0-10)', note: 'Higher is better. 10 = best.' },
  mexico_10: { min: 6, max: 10, inverted: false, label: 'Mexico (0-10)', note: 'Higher is better. 10 = best.' },
  mexico_100: { min: 60, max: 100, inverted: false, label: 'Mexico (0-100)', note: 'Higher is better. 100 = best.' },
  argentina: { min: 4, max: 10, inverted: false, label: 'Argentina (0-10)', note: 'Higher is better. 10 = best, 4 = pass.' },

  // Africa
  nigeria_5: { min: 1.5, max: 5.0, inverted: false, label: 'Nigeria GPA (0.0-5.0)', note: 'Higher is better. 5.0 = best.' },
  nigeria_pct: { min: 40, max: 100, inverted: false, label: 'Nigeria (0-100%)', note: 'Higher is better. 100% = best.' },
  south_africa: { min: 50, max: 100, inverted: false, label: 'South Africa (0-100%)', note: 'Higher is better. 100% = best.' },
  egypt: { min: 50, max: 100, inverted: false, label: 'Egypt (0-100%)', note: 'Higher is better. 100% = best.' },

  // Other
  custom: { min: '', max: '', inverted: false, label: 'Custom Scale', note: 'Enter your own min and max passing values.' }
};

let transcript = [];
let transcriptChart = null;

// DOM Init
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  setupLanguageToggle();
  setupThemeToggle();
  setupSearchableDropdown('from');
  setupSearchableDropdown('to');
  setupPWA();
  setupModalKeyboard();

  // Set defaults
  document.getElementById('country-to').value = 'germany';
  document.getElementById('country-to-input').value = 'Germany (1-5)';
  
  document.getElementById('obtained').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convert();
  });
  
  document.getElementById('swap-systems').addEventListener('click', () => {
    const fromVal = document.getElementById('country-from').value;
    const fromText = document.getElementById('country-from-input').value;
    const toVal = document.getElementById('country-to').value;
    const toText = document.getElementById('country-to-input').value;
    
    document.getElementById('country-from').value = toVal;
    document.getElementById('country-from-input').value = toText;
    document.getElementById('country-to').value = fromVal;
    document.getElementById('country-to-input').value = fromText;
    
    updateBadge('from', toVal);
    updateBadge('to', fromVal);
  });

  // Close modal on overlay click
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
});

// Translation Logic
function setupLanguageToggle() {
  const btn = document.getElementById('lang-toggle');
  btn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'de' : 'en';
    btn.textContent = currentLang === 'en' ? 'DE' : 'EN';
    applyTranslations();
  });
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang][key]) {
      el.innerHTML = i18n[currentLang][key];
    }
  });
}

// Theme Logic
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  // Restore saved theme
  const savedTheme = localStorage.getItem('gc_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    btn.textContent = '🌙';
  }
  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    btn.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('gc_theme', isLight ? 'light' : 'dark');
  });
}

// Custom Searchable Dropdown
function setupSearchableDropdown(type) {
  const input = document.getElementById(`country-${type}-input`);
  const hidden = document.getElementById(`country-${type}`);
  const list = document.getElementById(`dropdown-list-${type}`);
  const wrap = document.getElementById(`select-wrap-${type}`);
  
  // Render options
  let html = '';
  for (const [key, sys] of Object.entries(SYSTEMS)) {
    html += `<div class="dropdown-item" data-value="${key}"><strong>${sys.label}</strong></div>`;
  }
  list.innerHTML = html;
  
  input.addEventListener('focus', () => {
    list.classList.add('show');
  });
  
  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    list.classList.add('show');
    list.querySelectorAll('.dropdown-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(val) ? 'block' : 'none';
    });
  });
  
  list.addEventListener('mousedown', (e) => {
    const item = e.target.closest('.dropdown-item');
    if (item) {
      const val = item.getAttribute('data-value');
      const text = item.querySelector('strong').textContent;
      hidden.value = val;
      input.value = text;
      list.classList.remove('show');
      updateBadge(type, val);
    }
  });
  
  input.addEventListener('blur', () => {
    setTimeout(() => list.classList.remove('show'), 150);
  });
}

function updateBadge(type, val) {
  const badge = document.getElementById(`system-badge-${type}`);
  if (!val) { badge.textContent = ''; return; }
  const sys = SYSTEMS[val];
  badge.textContent = sys.note;
  
  if (type === 'from') {
    const customRow = document.getElementById('custom-min-max-row');
    const minInput = document.getElementById('min-grade');
    const maxInput = document.getElementById('max-grade');
    
    if (val === 'custom') {
      customRow.style.display = 'grid';
      minInput.value = ''; maxInput.value = '';
    } else {
      customRow.style.display = 'none';
      minInput.value = sys.min; maxInput.value = sys.max;
    }
  }
}

// Conversion Logic
function getECTS(pct) {
  if (pct >= 0.9) return 'A';
  if (pct >= 0.65) return 'B';
  if (pct >= 0.35) return 'C';
  if (pct >= 0.0) return 'D';
  return 'F';
}

function calculateConversion(obtained, srcMin, srcMax, invertedSrc, tgtMin, tgtMax, invertedTgt, fromSys, toSys) {
  // 1. Compute Percentile from Source
  let pct = 0;
  if (fromSys === 'germany') {
    pct = (4 - obtained) / 3;
  } else {
    if (!invertedSrc) {
      pct = (obtained - srcMin) / (srcMax - srcMin);
    } else {
      pct = (srcMin - obtained) / (srcMin - srcMax);
    }
  }
  
  // 2. Map Percentile to Target
  let targetGrade = 0;
  if (toSys === 'germany') {
    targetGrade = 1 + 3 * (1 - pct);
  } else {
    if (!invertedTgt) {
      targetGrade = tgtMin + pct * (tgtMax - tgtMin);
    } else {
      targetGrade = tgtMin - pct * (tgtMin - tgtMax);
    }
  }
  
  return { targetGrade: Math.round(targetGrade * 100) / 100, pct };
}

function convert() {
  const errorMsg = document.getElementById('error-msg');
  errorMsg.textContent = '';
  
  const fromSys = document.getElementById('country-from').value;
  const toSys = document.getElementById('country-to').value;
  let obtained = parseFloat(document.getElementById('obtained').value);
  
  if (!fromSys || !toSys) return errorMsg.textContent = 'Select both systems.';
  if (isNaN(obtained)) return errorMsg.textContent = 'Enter obtained grade.';
  
  const src = SYSTEMS[fromSys];
  const tgt = SYSTEMS[toSys];
  
  let srcMin = parseFloat(document.getElementById('min-grade').value) || parseFloat(src.min);
  let srcMax = parseFloat(document.getElementById('max-grade').value) || parseFloat(src.max);
  
  if (isNaN(srcMin) || isNaN(srcMax) || srcMin === srcMax) return errorMsg.textContent = 'Invalid min/max bounds.';
  
  let invertedSrc = src.inverted;
  if (srcMin > srcMax) invertedSrc = true;
  
  const result = calculateConversion(obtained, srcMin, srcMax, invertedSrc, tgt.min, tgt.max, tgt.inverted, fromSys, toSys);
  
  displayResult(result.targetGrade, result.pct, obtained, src, tgt, toSys);
}

function displayResult(targetGrade, pct, obtained, src, tgt, toSysId) {
  document.getElementById('result-empty').style.display = 'none';
  document.getElementById('result-content').style.display = 'block';
  
  document.getElementById('res-grade').textContent = targetGrade.toFixed(2);
  document.getElementById('res-label').textContent = toSysId === 'germany' ? getGermanLabel(targetGrade) : tgt.label;
  document.getElementById('res-badge').textContent = targetGrade.toFixed(1);
  document.getElementById('res-badge-sub').textContent = tgt.label;
  
  // Scale Pos
  let scalePos = pct * 100;
  scalePos = Math.max(0, Math.min(100, scalePos));
  setTimeout(() => {
    document.getElementById('scale-fill').style.width = `${scalePos}%`;
    document.getElementById('scale-thumb').style.left = `${scalePos}%`;
  }, 50);
  
  document.getElementById('scale-best').innerHTML = `${tgt.max}<br/><small>${i18n[currentLang].lbl_best}</small>`;
  document.getElementById('scale-worst').innerHTML = `${tgt.min}<br/><small>${i18n[currentLang].lbl_worst}</small>`;
  
  document.getElementById('meta-orig').textContent = obtained;
  document.getElementById('meta-pct').textContent = `${(pct * 100).toFixed(1)}%`;
  document.getElementById('meta-ects').textContent = getECTS(pct);
  
  const passEl = document.getElementById('meta-pass');
  if (pct >= 0) {
    passEl.textContent = 'PASS'; passEl.className = 'meta-val pass';
  } else {
    passEl.textContent = 'FAIL'; passEl.className = 'meta-val fail';
  }
  
  let formulaStr = toSysId === 'germany' 
    ? `1 + 3 * (1 - pct)` 
    : (tgt.inverted ? `Min - Pct * (Min - Max)` : `Min + Pct * (Max - Min)`);
  document.getElementById('formula-text').textContent = formulaStr;
  
  // Store for transcript
  window.lastResult = {
    course: `Item ${transcript.length + 1}`,
    srcGrade: obtained,
    tgtGrade: targetGrade.toFixed(2),
    status: pct >= 0 ? 'PASS' : 'FAIL',
    sysLabel: tgt.label
  };
}

function getGermanLabel(grade) {
  if (grade <= 1.5) return 'Sehr gut';
  if (grade <= 2.5) return 'Gut';
  if (grade <= 3.5) return 'Befriedigend';
  if (grade <= 4.0) return 'Ausreichend';
  return 'Nicht bestanden';
}

function copyResult() {
  const grade = document.getElementById('res-grade').textContent;
  const sys = document.getElementById('res-badge-sub').textContent;
  navigator.clipboard.writeText(`Converted Grade: ${grade} (${sys})`).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = i18n[currentLang].btn_copy, 2000);
  });
}

// ==========================================
// MODAL LOGIC
// ==========================================
function openModal() {
  if (!window.lastResult) return;
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-course').value = window.lastResult.course || '';
  document.getElementById('modal-credits').value = '';
  overlay.classList.add('show');
  setTimeout(() => document.getElementById('modal-course').focus(), 100);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
}

function setupModalKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Enter' && document.getElementById('modal-overlay').classList.contains('show')) {
      confirmAddToTranscript();
    }
  });
}

function confirmAddToTranscript() {
  if (!window.lastResult) return;
  const name = document.getElementById('modal-course').value.trim() || `Course ${transcript.length + 1}`;
  const credits = parseFloat(document.getElementById('modal-credits').value) || 0;
  window.lastResult.course = name;
  window.lastResult.credits = credits;
  transcript.push({ ...window.lastResult });
  closeModal();
  renderTranscript();
  saveToStorage();
}

// ==========================================
// LOCALSTORAGE PERSISTENCE
// ==========================================
function saveToStorage() {
  localStorage.setItem('gc_transcript', JSON.stringify(transcript));
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem('gc_transcript');
    if (saved) {
      transcript = JSON.parse(saved);
      if (transcript.length > 0) renderTranscript();
    }
  } catch(e) {
    transcript = [];
  }
}

function renderTranscript() {
  document.getElementById('transcript-section').style.display = 'block';
  const tbody = document.getElementById('transcript-body');

  // Weighted GPA calculation
  let totalWeighted = 0;
  let totalCredits = 0;
  let simpleTotal = 0;

  let html = transcript.map((t, i) => {
    const tgt = parseFloat(t.tgtGrade);
    const cr = t.credits || 0;
    simpleTotal += tgt;
    if (cr > 0) { totalWeighted += tgt * cr; totalCredits += cr; }
    const badgeClass = t.status === 'PASS' ? 'status-badge pass' : 'status-badge fail';
    const credStr = cr > 0 ? `<span class="credit-chip">${cr} cr</span>` : `<span class="credit-chip muted">—</span>`;
    return `
      <tr>
        <td>
          <div class="course-name">${t.course}</div>
          <div class="course-sys">Source: ${t.srcGrade} &bull; ${t.fromLabel || ''}</div>
        </td>
        <td>${credStr}</td>
        <td><div class="grade-pill">${t.tgtGrade}</div></td>
        <td><span class="sys-label-sm">${t.sysLabel}</span></td>
        <td><span class="${badgeClass}"><span class="status-dot"></span>${t.status}</span></td>
        <td style="text-align: right;">
          <button class="del-btn" onclick="removeTranscript(${i})" title="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  const avg = transcript.length > 0 ? (simpleTotal / transcript.length).toFixed(2) : '—';
  const wGpa = totalCredits > 0 ? (totalWeighted / totalCredits).toFixed(2) : null;
  const displayGpa = wGpa ? wGpa : avg;

  if (transcript.length > 0) {
    html += `
      <tr class="summary-row">
        <td colspan="2" style="color: var(--text-muted); font-size: 0.85rem;">
          ${wGpa ? 'Credit-weighted avg' : 'Simple avg (add credits for weighted GPA)'}
        </td>
        <td><div class="grade-pill highlight">${displayGpa}</div></td>
        <td colspan="3"></td>
      </tr>
    `;
  }

  tbody.innerHTML = html;

  // Update subtitle
  const subtitle = totalCredits > 0
    ? `${transcript.length} course${transcript.length !== 1 ? 's' : ''} &bull; ${totalCredits} credits &bull; Weighted GPA: <strong>${wGpa}</strong>`
    : `${transcript.length} course${transcript.length !== 1 ? 's' : ''} &bull; Avg: <strong>${avg}</strong>`;
  document.getElementById('transcript-subtitle').innerHTML = subtitle;

  renderChart();
}

function removeTranscript(index) {
  transcript.splice(index, 1);
  if (transcript.length === 0) {
    document.getElementById('transcript-section').style.display = 'none';
  } else {
    renderTranscript();
  }
  saveToStorage();
}

function clearTranscript() {
  transcript = [];
  document.getElementById('transcript-section').style.display = 'none';
  if (transcriptChart) { transcriptChart.destroy(); transcriptChart = null; }
  saveToStorage();
}

function exportCSV() {
  if (transcript.length === 0) return;
  const headers = ['Course', 'Credits', 'Source Grade', 'Target System', 'Target Grade', 'Status'];
  const rows = transcript.map(t =>
    `"${t.course}",${t.credits || 0},${t.srcGrade},"${t.sysLabel}",${t.tgtGrade},${t.status}`
  );
  const csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n' + rows.join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', 'gradeconvert_transcript.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// ==========================================
// CSV IMPORT
// ==========================================
function importCSV(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const lines = e.target.result.split('\n').filter(l => l.trim());
    if (lines.length < 2) { alert('CSV must have a header row and at least one data row.'); return; }
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
    const courseIdx = headers.findIndex(h => h.includes('course') || h.includes('name'));
    const creditsIdx = headers.findIndex(h => h.includes('credit'));
    const srcIdx = headers.findIndex(h => h.includes('source') || h.includes('grade'));
    const tgtIdx = headers.findIndex(h => h.includes('target'));
    const statusIdx = headers.findIndex(h => h.includes('status'));

    let imported = 0;
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.replace(/"/g, '').trim());
      if (!cols[0]) continue;
      transcript.push({
        course: courseIdx >= 0 ? cols[courseIdx] : `Imported Course ${i}`,
        credits: creditsIdx >= 0 ? parseFloat(cols[creditsIdx]) || 0 : 0,
        srcGrade: srcIdx >= 0 ? cols[srcIdx] : '—',
        tgtGrade: tgtIdx >= 0 ? cols[tgtIdx] : '—',
        sysLabel: 'Imported',
        fromLabel: '',
        status: statusIdx >= 0 ? cols[statusIdx] : 'PASS'
      });
      imported++;
    }
    if (imported > 0) { renderTranscript(); saveToStorage(); }
    else alert('No valid rows found in the CSV file.');
  };
  reader.readAsText(file);
  event.target.value = ''; // reset so same file can be re-imported
}

// ==========================================
// CHART.JS VISUALIZATION
// ==========================================
let currentChartType = 'bar';

function switchChart(type, btn) {
  currentChartType = type;
  document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderChart();
}

function renderChart() {
  const ctx = document.getElementById('transcript-chart');
  if (!ctx || transcript.length === 0) return;

  const labels = transcript.map(t => t.course.length > 15 ? t.course.substring(0, 15) + '…' : t.course);
  const data = transcript.map(t => parseFloat(t.tgtGrade));
  const colors = transcript.map(t =>
    t.status === 'PASS' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'
  );
  const borderColors = transcript.map(t =>
    t.status === 'PASS' ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'
  );

  if (transcriptChart) transcriptChart.destroy();

  const isLight = document.body.classList.contains('light-theme');
  const textColor = isLight ? '#0f172a' : '#a0a0aa';
  const gridColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';

  transcriptChart = new Chart(ctx, {
    type: currentChartType,
    data: {
      labels,
      datasets: [{
        label: 'Converted Grade',
        data,
        backgroundColor: currentChartType === 'line' ? 'rgba(99, 102, 241, 0.15)' : colors,
        borderColor: currentChartType === 'line' ? 'rgb(99, 102, 241)' : borderColors,
        borderWidth: 2,
        borderRadius: currentChartType === 'bar' ? 8 : 0,
        fill: currentChartType === 'line',
        tension: 0.4,
        pointBackgroundColor: borderColors,
        pointRadius: 5,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => transcript[items[0].dataIndex].course,
            label: (item) => ` Grade: ${item.raw} (${transcript[item.dataIndex].status})`
          }
        }
      },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: { ticks: { color: textColor }, grid: { color: gridColor } }
      }
    }
  });
}

// ==========================================
// PWA INSTALL
// ==========================================
let deferredInstallPrompt = null;

function setupPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const wrap = document.getElementById('pwa-install-wrap');
    const btn = document.getElementById('pwa-install-btn');
    if (wrap) wrap.style.display = 'block';
    if (btn) btn.addEventListener('click', () => {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(() => {
        deferredInstallPrompt = null;
        if (wrap) wrap.style.display = 'none';
      });
    });
  });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) { module.exports = { calculateConversion, SYSTEMS }; }
