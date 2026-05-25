
<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font-mono, monospace); background: transparent; color: var(--color-text-primary); font-size: 13px; line-height: 1.7; padding: 1rem 0; }
  .md { max-width: 860px; }
  .badge-row { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 20px; }
  .badge { background: var(--color-background-secondary); border: 1px solid var(--color-border-tertiary); border-radius: 999px; padding: 2px 10px; font-size: 11px; color: var(--color-text-secondary); font-family: var(--font-sans); }
  .badge.java { background: #fff3e0; color: #b85c00; border-color: #f4a83a55; }
  .badge.spring { background: #e8f5e9; color: #1b5e20; border-color: #43a04755; }
  .badge.react { background: #e3f2fd; color: #0d47a1; border-color: #1976d255; }
  .badge.mysql { background: #e8eaf6; color: #283593; border-color: #3949ab55; }
  .badge.jwt { background: #fce4ec; color: #880e4f; border-color: #e91e6355; }
  .badge.swagger { background: #e0f7fa; color: #006064; border-color: #0097a755; }
  @media (prefers-color-scheme: dark) {
    .badge.java { background: #3e2200; color: #ffb74d; border-color: #f4a83a55; }
    .badge.spring { background: #1b3a1e; color: #81c784; border-color: #43a04755; }
    .badge.react { background: #0d2a4a; color: #64b5f6; border-color: #1976d255; }
    .badge.mysql { background: #1a1f4a; color: #9fa8da; border-color: #3949ab55; }
    .badge.jwt { background: #3e0a1e; color: #f48fb1; border-color: #e91e6355; }
    .badge.swagger { background: #00222a; color: #4dd0e1; border-color: #0097a755; }
  }
  h1 { font-size: 22px; font-weight: 500; font-family: var(--font-sans); margin-bottom: 4px; color: var(--color-text-primary); }
  h2 { font-size: 16px; font-weight: 500; font-family: var(--font-sans); margin: 28px 0 10px; color: var(--color-text-primary); border-bottom: 1px solid var(--color-border-tertiary); padding-bottom: 6px; }
  h3 { font-size: 14px; font-weight: 500; font-family: var(--font-sans); margin: 18px 0 8px; color: var(--color-text-primary); }
  p { color: var(--color-text-secondary); font-family: var(--font-sans); margin-bottom: 10px; font-size: 14px; }
  code { background: var(--color-background-secondary); border: 1px solid var(--color-border-tertiary); border-radius: 4px; padding: 1px 6px; font-size: 12px; color: var(--color-text-primary); }
  pre { background: var(--color-background-secondary); border: 1px solid var(--color-border-tertiary); border-radius: 8px; padding: 14px 16px; overflow-x: auto; margin: 10px 0 16px; }
  pre code { background: none; border: none; padding: 0; font-size: 12px; }
  .role-table { width: 100%; border-collapse: collapse; margin: 10px 0 16px; font-family: var(--font-sans); font-size: 13px; }
  .role-table th { background: var(--color-background-secondary); text-align: left; padding: 8px 12px; border: 1px solid var(--color-border-tertiary); color: var(--color-text-primary); font-weight: 500; }
  .role-table td { padding: 8px 12px; border: 1px solid var(--color-border-tertiary); color: var(--color-text-secondary); }
  .role-table tr:hover td { background: var(--color-background-secondary); }
  .tree { font-family: var(--font-mono); font-size: 12px; color: var(--color-text-secondary); line-height: 1.9; }
  .tree .dir { color: var(--color-text-primary); font-weight: 500; }
  .copy-btn { background: var(--color-background-secondary); border: 1px solid var(--color-border-tertiary); border-radius: 6px; padding: 3px 10px; font-size: 11px; font-family: var(--font-sans); color: var(--color-text-secondary); cursor: pointer; float: right; margin-top: -2px; }
  .copy-btn:hover { background: var(--color-border-tertiary); }
  .section-note { font-size: 12px; color: var(--color-text-tertiary); font-family: var(--font-sans); margin-top: -6px; margin-bottom: 12px; }
  ul { color: var(--color-text-secondary); font-family: var(--font-sans); font-size: 14px; padding-left: 20px; margin-bottom: 10px; }
  li { margin-bottom: 4px; }
  .pill { display: inline-block; background: var(--color-background-secondary); border-radius: 4px; padding: 1px 7px; font-size: 11px; border: 1px solid var(--color-border-tertiary); margin-right: 4px; color: var(--color-text-secondary); font-family: var(--font-mono); }
  .admin-note { background: var(--color-background-secondary); border-left: 3px solid #f4a83a; border-radius: 0 6px 6px 0; padding: 10px 14px; margin: 10px 0; font-family: var(--font-sans); font-size: 13px; color: var(--color-text-secondary); }
  .divider { border: none; border-top: 1px solid var(--color-border-tertiary); margin: 24px 0; }
</style>
</head>
<body>
<div class="md">

<h1>✍️ InkWrite — Full Stack Blog Platform</h1>
<p>A multi-role blogging platform built with Spring Boot, React.js, MySQL, and JWT authentication. Users can create, manage, and comment on posts; admins have full control over users, posts, and categories.</p>

<div class="badge-row">
  <span class="badge java">Java 17+</span>
  <span class="badge spring">Spring Boot</span>
  <span class="badge spring">Spring Security</span>
  <span class="badge spring">Spring Data JPA</span>
  <span class="badge react">React.js</span>
  <span class="badge mysql">MySQL</span>
  <span class="badge jwt">JWT</span>
  <span class="badge swagger">Swagger / OpenAPI</span>
  <span class="badge">Lombok</span>
</div>

<hr class="divider">

<h2>📋 Table of Contents</h2>
<ul>
  <li><a href="#features" style="color:var(--color-text-info)">Features</a></li>
  <li><a href="#tech-stack" style="color:var(--color-text-info)">Tech Stack</a></li>
  <li><a href="#project-structure" style="color:var(--color-text-info)">Project Structure</a></li>
  <li><a href="#getting-started" style="color:var(--color-text-info)">Getting Started</a></li>
  <li><a href="#env-config" style="color:var(--color-text-info)">Environment Configuration</a></li>
  <li><a href="#api-docs" style="color:var(--color-text-info)">API Documentation</a></li>
  <li><a href="#roles" style="color:var(--color-text-info)">Role System</a></li>
  <li><a href="#diagrams" style="color:var(--color-text-info)">Diagrams</a></li>
</ul>

<hr class="divider">

<h2 id="features">✅ Features</h2>

<h3>👤 User</h3>
<ul>
  <li>Register and login with JWT-based authentication</li>
  <li>Create, update, and delete own posts</li>
  <li>Read posts by other users</li>
  <li>Comment on any post (including reply to other comments)</li>
  <li>Read all comments on a post</li>
</ul>

<h3>🛡️ Admin</h3>
<ul>
  <li>Full CRUD over all posts and users</li>
  <li>Create and manage post categories</li>
  <li>Registers as a normal user → role manually assigned in DB → redirected to Admin Dashboard on login</li>
</ul>

<hr class="divider">

<h2 id="tech-stack">🛠️ Tech Stack</h2>
<table class="role-table">
  <tr><th>Layer</th><th>Technology</th></tr>
  <tr><td>Backend</td><td>Spring Boot, Spring Security, Spring Data JPA</td></tr>
  <tr><td>Frontend</td><td>React.js</td></tr>
  <tr><td>Database</td><td>MySQL</td></tr>
  <tr><td>Auth</td><td>JWT (stored in localStorage)</td></tr>
  <tr><td>API Docs</td><td>Swagger / OpenAPI</td></tr>
  <tr><td>Utilities</td><td>Lombok, Maven</td></tr>
</table>

<hr class="divider">

<h2 id="getting-started">🚀 Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Java 17+</li>
  <li>Node.js 18+</li>
  <li>MySQL 8+</li>
  <li>Maven</li>
</ul>


<hr class="divider">

<h2 id="api-docs">📖 API Documentation</h2>
<p>Swagger UI is available once the backend is running:</p>
<pre><code>http://localhost:9095/swagger-ui/index.html</code></pre>

<p>Base URL for all endpoints:</p>
<pre><code>http://localhost:9095/api/v1/</code></pre>

<h3>Key Endpoints</h3>
<table class="role-table">
  <tr><th>Method</th><th>Endpoint</th><th>Access</th></tr>
  <tr><td>POST</td><td><code>/api/v1/auth/register</code></td><td>Public</td></tr>
  <tr><td>POST</td><td><code>/api/v1/auth/login</code></td><td>Public</td></tr>
  <tr><td>GET</td><td><code>/api/v1/posts</code></td><td>Public</td></tr>
  <tr><td>POST</td><td><code>/api/v1/posts</code></td><td>User / Admin</td></tr>
  <tr><td>PUT</td><td><code>/api/v1/posts/{id}</code></td><td>Author / Admin</td></tr>
  <tr><td>DELETE</td><td><code>/api/v1/posts/{id}</code></td><td>Author / Admin</td></tr>
  <tr><td>POST</td><td><code>/api/v1/comments</code></td><td>User / Admin</td></tr>
  <tr><td>GET</td><td><code>/api/v1/admin/users</code></td><td>Admin only</td></tr>
  <tr><td>POST</td><td><code>/api/v1/admin/categories</code></td><td>Admin only</td></tr>
</table>

<hr class="divider">

<h2 id="roles">🔐 Role System</h2>
<table class="role-table">
  <tr><th>Role ID</th><th>Role Name</th><th>Assigned By</th></tr>
  <tr><td><code>501</code></td><td>ROLE_ADMIN</td><td>Manually in DB</td></tr>
  <tr><td><code>502</code></td><td>ROLE_USER</td><td>Auto on registration</td></tr>
</table>

<div class="admin-note">
  ⚠️ <strong>Admin Setup:</strong> To make a user an admin, manually update their role in the database:<br><br>
  <code>UPDATE user_role SET role_id = 501 WHERE user_id = {your_user_id};</code><br><br>
  On next login, the user will be redirected to the Admin Dashboard automatically.
</div>

<hr class="divider">

<h2 id="diagrams">📊 Diagrams</h2>
<p>The following diagrams are available in the <code>/docs</code> folder:</p>
<ul>
  <li>📸 Screenshots — UI walkthrough</li>
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124104" src="https://github.com/user-attachments/assets/24829679-0ace-4cd0-a13a-895ea154cd8c" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124052" src="https://github.com/user-attachments/assets/fb96522d-388b-4d63-a73a-1cefd8c5b703" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124115" src="https://github.com/user-attachments/assets/08e4da08-3a00-4da1-bc2e-60fc0a13a0d6" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124224" src="https://github.com/user-attachments/assets/a5d92052-41c8-4b7b-b9bd-104352e44dc9" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 124241" src="https://github.com/user-attachments/assets/45f1566f-f5b8-402c-bf15-017ac3ab89be" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 130223" src="https://github.com/user-attachments/assets/a34a3638-6186-4c00-9266-14667ba1b9eb" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 130309" src="https://github.com/user-attachments/assets/6fe073c7-9a84-441c-9fa3-26b5d42feaf5" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 130437" src="https://github.com/user-attachments/assets/4e92d06e-5488-4031-93c8-c2ac808675cf" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 130501" src="https://github.com/user-attachments/assets/048680c7-7961-408a-badc-1c7127805410" />
<img width="1920" height="1080" alt="Screenshot 2026-05-25 131539" src="https://github.com/user-attachments/assets/0b6d77fc-c630-4d83-93b5-9e83369c00ca" />

</ul>

<hr class="divider">

<p style="font-size:12px;color:var(--color-text-tertiary);font-family:var(--font-sans)">Made with ☕ by Twinkle &nbsp;|&nbsp; InkWrite &nbsp;|&nbsp; 2025</p>

</div>
</body>
</html>
