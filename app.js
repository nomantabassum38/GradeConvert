// Grading systems database
// inverted: true means a lower number is better (e.g., Germany 1 is better than 5)
const SYSTEMS = {
  // Europe
  austria: { min: 5, max: 1, inverted: true, label: 'Austria (1-5)', note: 'Lower is better. 1 = best, 5 = worst.' },
  belgium: { min: 0, max: 20, inverted: false, label: 'Belgium (0-20)', note: 'Higher is better. 20 = best.' },
  czechia: { min: 4, max: 1, inverted: true, label: 'Czech Republic (1-4)', note: 'Lower is better. 1 = best, 4 = worst.' },
  denmark: { min: -3, max: 12, inverted: false, label: 'Denmark (-3 to 12)', note: 'Higher is better. 12 = best.' },
  finland: { min: 0, max: 5, inverted: false, label: 'Finland (0-5)', note: 'Higher is better. 5 = best.' },
  france: { min: 0, max: 20, inverted: false, label: 'France (0-20)', note: 'Higher is better. 20 = best.' },
  germany: { min: 5, max: 1, inverted: true, label: 'Germany (1-5)', note: 'Lower is better. 1 = best, 5 = worst.' },
  hungary: { min: 1, max: 5, inverted: false, label: 'Hungary (1-5)', note: 'Higher is better. 5 = best.' },
  italy: { min: 18, max: 30, inverted: false, label: 'Italy (18-30)', note: 'Higher is better. 30 = best.' },
  netherlands: { min: 1, max: 10, inverted: false, label: 'Netherlands (1-10)', note: 'Higher is better. 10 = best.' },
  norway: { min: 0, max: 6, inverted: false, label: 'Norway (0-6)', note: 'Higher is better. A(6) to F(0).' },
  poland: { min: 2, max: 5, inverted: false, label: 'Poland (2-5)', note: 'Higher is better. 5 = best.' },
  russia: { min: 2, max: 5, inverted: false, label: 'Russia (2-5)', note: 'Higher is better. 5 = best.' },
  spain: { min: 0, max: 10, inverted: false, label: 'Spain (0-10)', note: 'Higher is better. 10 = best.' },
  sweden: { min: 0, max: 5, inverted: false, label: 'Sweden (0-5)', note: 'Higher is better. 5 = best.' },
  switzerland: { min: 1, max: 6, inverted: false, label: 'Switzerland (1-6)', note: 'Higher is better. 6 = best, 1 = worst.' },
  uk: { min: 0, max: 100, inverted: false, label: 'UK Percentage', note: 'Higher is better. 100% = best.' },
  
  // Americas
  usa: { min: 0, max: 4, inverted: false, label: 'US GPA (0-4)', note: 'Higher is better. 4.0 = best.' },
  usa_pct: { min: 0, max: 100, inverted: false, label: 'US Percentage', note: 'Higher is better. 100% = best.' },
  canada: { min: 0, max: 4, inverted: false, label: 'Canada GPA (0-4)', note: 'Higher is better. 4.0 = best.' },
  brazil: { min: 0, max: 10, inverted: false, label: 'Brazil (0-10)', note: 'Higher is better. 10 = best.' },
  mexico: { min: 0, max: 10, inverted: false, label: 'Mexico (0-10)', note: 'Higher is better. 10 = best.' },
  
  // Asia & Pacific
  china: { min: 0, max: 100, inverted: false, label: 'China (0-100)', note: 'Higher is better. 100 = best.' },
  india: { min: 0, max: 100, inverted: false, label: 'India (0-100)', note: 'Higher is better. 100 = best.' },
  japan: { min: 0, max: 100, inverted: false, label: 'Japan (0-100)', note: 'Higher is better. 100 = best.' },
  australia: { min: 0, max: 100, inverted: false, label: 'Australia (0-100)', note: 'Higher is better. 100 = best.' },
  pakistan: { min: 0, max: 100, inverted: false, label: 'Pakistan (0-100)', note: 'Higher is better. 100 = best.' },
  turkey: { min: 0, max: 100, inverted: false, label: 'Turkey (0-100)', note: 'Higher is better. 100 = best.' },
  
  // Other
  custom: { min: '', max: '', inverted: false, label: 'Custom Scale', note: 'Enter your own min and max values.' }
};

// DOM Elements
const countrySelect = document.getElementById('country');
const minInput = document.getElementById('min-grade');
const maxInput = document.getElementById('max-grade');
const obtainedInput = document.getElementById('obtained');
const systemBadge = document.getElementById('system-badge');
const errorMsg = document.getElementById('error-msg');

const resultEmpty = document.getElementById('result-empty');
const resultContent = document.getElementById('result-content');

// Auto-fill min/max based on selected country
countrySelect.addEventListener('change', (e) => {
  const val = e.target.value;
  if (!val) {
    systemBadge.textContent = '';
    minInput.value = '';
    maxInput.value = '';
    minInput.disabled = false;
    maxInput.disabled = false;
    return;
  }
  
  const system = SYSTEMS[val];
  systemBadge.textContent = system.note;
  
  if (val === 'custom') {
    minInput.value = '';
    maxInput.value = '';
    minInput.disabled = false;
    maxInput.disabled = false;
    minInput.focus();
  } else {
    minInput.value = system.min;
    maxInput.value = system.max;
    // Don't completely disable, just let them know it's standard
    // Some universities might slightly modify the standard range
  }
});

// Run conversion on Enter key
obtainedInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    convert();
  }
});

function getECTS(germanGrade) {
  if (germanGrade <= 1.5) return 'A';
  if (germanGrade <= 2.5) return 'B';
  if (germanGrade <= 3.5) return 'C';
  if (germanGrade <= 4.0) return 'D';
  return 'F';
}

function getLabel(germanGrade) {
  if (germanGrade <= 1.5) return 'Sehr gut (Very good)';
  if (germanGrade <= 2.5) return 'Gut (Good)';
  if (germanGrade <= 3.5) return 'Befriedigend (Satisfactory)';
  if (germanGrade <= 4.0) return 'Ausreichend (Sufficient)';
  return 'Nicht bestanden (Fail)';
}

function convert() {
  // Reset error
  errorMsg.textContent = '';
  
  const obtained = parseFloat(obtainedInput.value);
  const min = parseFloat(minInput.value);
  const max = parseFloat(maxInput.value);
  const selectedCountry = countrySelect.value;
  
  // Validation
  if (isNaN(obtained)) {
    errorMsg.textContent = 'Please enter your obtained grade.';
    return;
  }
  if (isNaN(min) || isNaN(max)) {
    errorMsg.textContent = 'Please provide valid minimum and maximum grades.';
    return;
  }
  if (min === max) {
    errorMsg.textContent = 'Min and max grades cannot be the same.';
    return;
  }
  
  // Check if inverted scale
  let inverted = false;
  if (selectedCountry && SYSTEMS[selectedCountry] && SYSTEMS[selectedCountry].inverted) {
    inverted = true;
  } else if (min > max) {
    // Auto-detect inverted if user manually entered min > max
    inverted = true;
  }
  
  // Check boundaries
  if (!inverted) {
    if (obtained < min || obtained > max) {
      errorMsg.textContent = `Grade must be between ${min} and ${max}.`;
      return;
    }
  } else {
    // Inverted: min is the worst (higher number), max is best (lower number)
    // E.g., min: 5, max: 1
    if (obtained > min || obtained < max) {
      errorMsg.textContent = `Grade must be between ${max} (best) and ${min} (worst).`;
      return;
    }
  }
  
  // Calculate Percentile
  let percentile;
  if (!inverted) {
    percentile = (obtained - min) / (max - min);
  } else {
    // For inverted, if you get 2 on a 1-5 scale (where 1 is best)
    // worst (min) = 5, best (max) = 1
    // (5 - 2) / (5 - 1) = 3 / 4 = 0.75 percentile
    percentile = (min - obtained) / (min - max);
  }
  
  // Modified Bavarian Formula
  // German Grade = 1 + 3 * (1 - Percentile)
  // Max grade gives 1.0. Min grade gives 4.0.
  let germanGrade = 1 + 3 * (1 - percentile);
  
  // Format to 2 decimal places max
  germanGrade = Math.round(germanGrade * 100) / 100;
  
  // Show Results
  displayResult(germanGrade, percentile, obtained, min, max, inverted);
}

function displayResult(germanGrade, percentile, obtained, min, max, inverted) {
  resultEmpty.style.display = 'none';
  resultContent.style.display = 'block';
  
  document.getElementById('res-grade').textContent = germanGrade.toFixed(2);
  document.getElementById('res-label').textContent = getLabel(germanGrade);
  document.getElementById('res-badge').textContent = germanGrade.toFixed(1);
  
  // Calculate position for visual scale (1 to 5)
  // 1 is 0%, 5 is 100%
  let scalePos = ((germanGrade - 1) / 4) * 100;
  scalePos = Math.max(0, Math.min(100, scalePos));
  
  setTimeout(() => {
    document.getElementById('scale-fill').style.width = `${scalePos}%`;
    document.getElementById('scale-thumb').style.left = `${scalePos}%`;
  }, 50);
  
  document.getElementById('meta-orig').textContent = obtained;
  document.getElementById('meta-pct').textContent = `${(percentile * 100).toFixed(1)}%`;
  document.getElementById('meta-ects').textContent = getECTS(germanGrade);
  
  const passEl = document.getElementById('meta-pass');
  if (germanGrade <= 4.0) {
    passEl.textContent = 'PASS';
    passEl.className = 'meta-val pass';
  } else {
    passEl.textContent = 'FAIL';
    passEl.className = 'meta-val fail';
  }
  
  // Formula presentation
  let formulaStr = `1 + 3 × (1 - `;
  if (!inverted) {
    formulaStr += `((${obtained} - ${min}) / (${max} - ${min})))`;
  } else {
    formulaStr += `((${min} - ${obtained}) / (${min} - ${max})))`;
  }
  document.getElementById('formula-text').textContent = formulaStr;
}

function copyResult() {
  const grade = document.getElementById('res-grade').textContent;
  const label = document.getElementById('res-label').textContent;
  const text = `My converted German grade is ${grade} (${label})`;
  
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.copy-btn');
    const oldText = btn.textContent;
    btn.textContent = 'Copied to clipboard!';
    setTimeout(() => {
      btn.textContent = oldText;
    }, 2000);
  });
}
