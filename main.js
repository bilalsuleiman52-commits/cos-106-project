// Mobile menu and active link
const nav = document.getElementById('nav');
const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href') === here) a.classList.add('active');
});

// Academic planner
const taskForm = document.getElementById('task-form');
if (taskForm) {
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  const count = document.getElementById('task-count');
  let tasks = [];

  function render() {
    list.innerHTML = '';
    tasks.forEach((t, i) => {
      const li = document.createElement('li');
      if (t.done) li.classList.add('done');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = t.done;
      box.style.width = 'auto';
      box.setAttribute('aria-label', 'Mark "' + t.text + '" as completed');
      box.addEventListener('change', () => { tasks[i].done = box.checked; render(); });
      const span = document.createElement('span');
      span.textContent = t.text;
      const del = document.createElement('button');
      del.textContent = 'Delete';
      del.addEventListener('click', () => { tasks.splice(i, 1); render(); });
      li.append(box, span, del);
      list.appendChild(li);
    });
    const left = tasks.filter(t => !t.done).length;
    count.textContent = tasks.length ? left + ' of ' + tasks.length + ' tasks left' : 'No tasks yet. Add your first one above.';
  }

  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ text, done: false });
    input.value = '';
    render();
  });
  render();
}

// Contact form validation
const form = document.getElementById('contact-form');
if (form) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d+$/;
  const fields = ['name', 'email', 'phone', 'message'];

  function check(id) {
    const el = document.getElementById(id);
    const v = el.value.trim();
    let msg = '';
    if (!v) msg = 'This field cannot be empty.';
    else if (id === 'email' && !emailPattern.test(v)) msg = 'Enter a valid email, like name@example.com.';
    else if (id === 'phone' && !phonePattern.test(v)) msg = 'Use digits only, with no spaces or symbols.';
    document.getElementById('err-' + id).textContent = msg;
    el.classList.toggle('invalid', !!msg);
    return !msg;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const ok = fields.map(check).every(Boolean);
    status.textContent = ok ? 'Thank you. Your message has been sent.' : '';
    if (ok) form.reset();
  });
  fields.forEach(id => document.getElementById(id).addEventListener('blur', () => check(id)));
}
