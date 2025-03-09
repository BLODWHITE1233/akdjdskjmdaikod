// Giriş ve kayıt işlemleri
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.error) {
    alert(data.error);
  } else {
    window.location.href = '/';
  }
});

document.getElementById('register-link').addEventListener('click', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.error) {
    alert(data.error);
  } else {
    alert(data.message);
  }
});

// Log çekme işlemi
async function fetchLogs() {
  const url = document.getElementById('url-input').value;
  if (!url) {
    alert('Lütfen bir URL girin.');
    return;
  }

  const response = await fetch(/api/logs?url=${encodeURIComponent(url)});
  const data = await response.json();

  if (data.error) {
    document.getElementById('log-output').textContent = data.error;
  } else {
    document.getElementById('log-output').textContent = data.logs;
  }
}\