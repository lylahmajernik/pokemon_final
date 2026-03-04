// Simple mock auth API that returns a fake JWT for demo purposes.
function base64UrlEncode(obj) {
  // browser-safe base64url encode
  const json = JSON.stringify(obj);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

const USERS_KEY = 'mockUsers';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveUsers(list) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); } catch (e) {}
}

export async function loginApi({ username, password }) {
  if (!username || !password) return { ok: false, error: 'Username and password are required' };
  const users = loadUsers();
  const found = users.find((u) => u.username === username);
  if (!found || found.password !== password) return { ok: false, error: 'Invalid credentials' };

  const now = Math.floor(Date.now() / 1000);
  const payload = { sub: username, iat: now, exp: now + 60 * 60, username };
  const header = { alg: 'HS256', typ: 'JWT' };
  const token = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.signature`;
  return { ok: true, token };
}

export async function registerApi({ username, password }) {
  if (!username || !password || password.length < 6) {
    return { ok: false, error: 'Invalid username or password (min 6 chars)' };
  }
  const users = loadUsers();
  if (users.some((u) => u.username === username)) return { ok: false, error: 'Username already exists' };
  users.push({ username, password });
  saveUsers(users);
  return loginApi({ username, password });
}
