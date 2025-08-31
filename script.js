// script.js
const form = document.getElementById('regForm');
const password = document.getElementById('password');
const confirmPwd = document.getElementById('confirm');
const matchMsg = document.getElementById('matchMsg');
const strength = document.getElementById('strength');
const pwBar = document.getElementById('pwBar');
const dob = document.getElementById('dob');
const age = document.getElementById('age');
const bio = document.getElementById('bio');
const bioCount = document.getElementById('bioCount');
const hours = document.getElementById('studyHours');
const hoursOut = document.getElementById('hoursOut');
const progress = document.getElementById('progress');
const needAid = document.getElementById('needAid');
const income = document.getElementById('income');
const resume = document.getElementById('resume');
const photo = document.getElementById('photo');
const avatarPreview = document.getElementById('avatarPreview');

bio.addEventListener('input', () => { bioCount.textContent = bio.value.length; });
hours.addEventListener('input', () => { hoursOut.textContent = hours.value; });

function zxcvbnLite(p) {
  let score = 0; if (!p) return 0;
  if (p.length >= 8) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return Math.min(score, 4);
}
function updatePw() {
  const s = zxcvbnLite(password.value);
  strength.value = s;
  pwBar.style.width = (s * 25) + '%';
  if (confirmPwd.value) {
    matchMsg.textContent = password.value === confirmPwd.value ? 'Passwords match ✓' : 'Passwords do not match';
    matchMsg.style.color = password.value === confirmPwd.value ? 'var(--ok)' : 'var(--err)';
  } else { matchMsg.textContent = ''; }
}
password.addEventListener('input', updatePw);
confirmPwd.addEventListener('input', updatePw);

dob.addEventListener('change', () => {
  const d = new Date(dob.value);
  if (isNaN(d)) { age.value = ''; return; }
  const today = new Date();
  let a = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) a--;
  age.value = a;
});

needAid.addEventListener('change', () => {
  income.disabled = !needAid.checked;
  if (!needAid.checked) income.value = '';
});

resume.addEventListener('change', () => {
  const f = resume.files[0];
  if (f && f.size > 2 * 1024 * 1024) {
    alert('Resume exceeds 2 MB. Please upload a smaller PDF.');
    resume.value = '';
  }
});

photo.addEventListener('change', () => {
  const f = photo.files[0];
  if (f) { avatarPreview.src = URL.createObjectURL(f); }
  else { avatarPreview.removeAttribute('src'); }
});

const requiredIds = ['email','password','confirm','firstName','lastName','dob','address1','city','state','pin','course'];
form.addEventListener('input', () => {
  let done = 0;
  requiredIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.value && el.checkValidity()) done++;
  });
  progress.value = done;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const data = new FormData(form);
  const obj = Object.fromEntries(data.entries());
  obj.interests = data.getAll('interests');
  obj.languages = data.getAll('languages');
  alert('Form submitted!\\n\\n' + JSON.stringify(obj, null, 2));
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    document.getElementById('submitBtn').click();
  }
});
