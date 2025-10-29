<template>
  <section class="not-found">
    <h1>ページが見つかりません</h1>
    <p>お探しのページは移動または削除された可能性があります。</p>
    <RouterLink to="/dashboard">ダッシュボードに戻る</RouterLink>
  </section>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  text-align: center;
  background: #fff;
  padding: clamp(2rem, 5vw, 3rem);
  border-radius: 18px;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.07);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.not-found h1 {
  margin-top: 0;
  font-size: clamp(1.8rem, 4vw, 2.3rem);
  color: #1e293b;
}

.not-found p {
  color: #64748b;
}

.not-found a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.not-found a:hover {
  background: #1d4ed8;
}
</style>
