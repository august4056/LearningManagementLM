<template>
  <div id="app">
    <header class="app-header">
      <div class="app-header__branding">
        <h1>研修受講者管理ダッシュボード</h1>
        <p>研修・受講者の状況を一目で把握できます</p>
      </div>
      <nav class="app-nav">
        <RouterLink to="/dashboard">ダッシュボード</RouterLink>
        <RouterLink to="/trainings">研修一覧</RouterLink>
        <RouterLink to="/participants">受講者一覧</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
    <footer class="app-footer">
      <small>© 2024 Training Management Platform</small>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1f2933;
  background-color: #f7f9fc;
}

.app-header {
  background: linear-gradient(120deg, #2563eb, #1d4ed8);
  color: #fff;
  padding: 2rem clamp(1.5rem, 4vw, 3rem);
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.25);
}

.app-header__branding {
  margin-bottom: 1.5rem;
}

.app-header__branding h1 {
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  margin: 0;
}

.app-header__branding p {
  margin: 0.3rem 0 0;
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  opacity: 0.9;
}

.app-nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.app-nav a {
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.25rem;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.app-nav a.router-link-active {
  border-color: rgba(255, 255, 255, 0.9);
  color: #fff;
}

.app-nav a:hover {
  color: #fff;
}

.app-main {
  flex: 1;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.app-footer {
  padding: 1.5rem;
  text-align: center;
  color: #556987;
}
</style>
