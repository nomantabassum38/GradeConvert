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

// DOM Init
document.addEventListener('DOMContentLoaded', () => {
  setupLanguageToggle();
  setupThemeToggle();
  setupSearchableDropdown('from');
  setupSearchableDropdown('to');
  
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
  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    btn.textContent = isLight ? '🌙' : '☀️';
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
  let tgtMin = tgt.min; let tgtMax = tgt.max;
  let invertedTgt = tgt.inverted;
  
  if (toSys === 'germany') {
    targetGrade = 1 + 3 * (1 - pct);
  } else {
    if (!invertedTgt) {
      targetGrade = tgtMin + pct * (tgtMax - tgtMin);
    } else {
      targetGrade = tgtMin - pct * (tgtMin - tgtMax);
    }
  }
  
  targetGrade = Math.round(targetGrade * 100) / 100;
  displayResult(targetGrade, pct, obtained, src, tgt, toSys);
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

function addToTranscript() {
  if (!window.lastResult) return;
  const courseName = prompt("Enter Course Name:", window.lastResult.course);
  if (!courseName) return;
  window.lastResult.course = courseName;
  
  transcript.push(window.lastResult);
  renderTranscript();
}

function renderTranscript() {
  document.getElementById('transcript-section').style.display = 'block';
  const tbody = document.getElementById('transcript-body');
  tbody.innerHTML = transcript.map((t, i) => `
    <tr>
      <td><strong>${t.course}</strong></td>
      <td>${t.srcGrade}</td>
      <td><strong>${t.tgtGrade}</strong> <small>${t.sysLabel}</small></td>
      <td class="${t.status === 'PASS' ? 'pass' : 'fail'}">${t.status}</td>
      <td><button class="del-btn" onclick="removeTranscript(${i})">&times;</button></td>
    }
  `).join('');
}

function removeTranscript(index) {
  transcript.splice(index, 1);
  if (transcript.length === 0) {
    document.getElementById('transcript-section').style.display = 'none';
  } else {
    renderTranscript();
  }
}

function clearTranscript() {
  transcript = [];
  document.getElementById('transcript-section').style.display = 'none';
}

function exportCSV() {
  if (transcript.length === 0) return;
  const headers = ['Course', 'Source Grade', 'Target Grade', 'Status'];
  const rows = transcript.map(t => `"${t.course}",${t.srcGrade},${t.tgtGrade},${t.status}`);
  const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "transcript.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}
