Security notes — basic guidance

This project is a frontend-only SPA with a mock auth layer. Below are practical, non-invasive steps and guidance to improve security ready for a backend integration.

1) Content Security Policy (CSP)
- A basic CSP meta tag is added to `index.html`. Adjust for production to remove `unsafe-inline` and `unsafe-eval` once your build and server are configured to avoid inline scripts.
- Example production policy:
  Content-Security-Policy: default-src 'self'; img-src 'self' https: data:; connect-src 'self' https:; style-src 'self'; script-src 'self';

2) Token storage
- Current approach: token is stored in `localStorage` only when the user chooses "remember" (the `remember` flag in `login`/`register`).
- Risk: tokens in `localStorage` are accessible to JavaScript and vulnerable to theft via XSS.
- Recommended production approach: issue session tokens as `HttpOnly`, `Secure`, `SameSite=strict` cookies from the server. The browser sends these cookies automatically and JavaScript cannot read them.

3) CSRF protection
- With server-managed cookies, implement CSRF protection for state-changing endpoints (POST/PUT/DELETE). Options:
  - Double-submit cookie: server sets an `HttpOnly` session cookie and a separate non-`HttpOnly` CSRF cookie; client reads the CSRF cookie and includes it as a header in requests; server verifies header and cookie match.
  - Synchronizer token pattern: server provides a CSRF token via a safe endpoint and stores it in the server session; client submits the token with state-changing requests.
  - Use same-site cookies (`SameSite=Strict` or `Lax`) to reduce CSRF risk.

4) XSS mitigations
- React escapes text content by default; avoid `dangerouslySetInnerHTML` and any direct DOM insertion of HTML.
- Validate and sanitize any user input displayed back to other users.
- Keep third-party dependencies up-to-date and audit them regularly.
- Add a CSP (see above) to reduce impact if an XSS bug appears.

5) Server example (minimal)
- Login endpoint (issues `HttpOnly` cookie):
  POST /api/login
  Request body: { username, password }
  Response: sets cookie `Set-Cookie: session=<token>; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`

- CSRF-protected endpoint example:
  POST /api/team
  Headers: `x-csrf-token: <token-from-cookie-or-endpoint>`
  Server verifies session cookie and csrf token before changing state.

6) Practical migration steps
- Add server endpoints for auth; return tokens via `Set-Cookie` rather than JSON tokens.
- Replace client localStorage token logic with a small authentication wrapper that calls the server; remove direct token parsing and instead rely on server responses to indicate auth state.
- Keep a short-lived in-memory token or state locally for UI only if necessary.

If you want, I can:
- Convert `AuthContext` to a server-ready client (example fetch wrappers using cookies and CSRF header), or
- Provide a minimal Express/Node example showing cookie-based auth + CSRF token endpoint you can adapt.

