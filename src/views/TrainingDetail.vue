<template>
  <section class="training-detail" v-if="!loading && training">
    <nav class="breadcrumbs" aria-label="パンくずリスト">
      <RouterLink to="/dashboard">ホーム</RouterLink>
      <RouterLink to="/trainings">研修一覧</RouterLink>
      <span aria-current="page">{{ training.title }}</span>
    </nav>

    <header class="training-detail__header">
      <div>
        <h1>{{ training.title }}</h1>
        <p class="training-detail__category">カテゴリー: {{ training.category }}</p>
      </div>
      <div class="training-detail__schedule">
        <p><strong>期間</strong> {{ formatDate(training.startDate) }} 〜 {{ formatDate(training.endDate) }}</p>
        <p><strong>会場</strong> {{ training.location }}</p>
        <p><strong>講師</strong> {{ training.instructor }}</p>
      </div>
    </header>

    <section class="training-detail__body">
      <article class="training-detail__section">
        <h2>研修概要</h2>
        <p>{{ training.description }}</p>
      </article>

      <article class="training-detail__section" v-if="training.objectives?.length">
        <h2>到達目標</h2>
        <ul>
          <li v-for="objective in training.objectives" :key="objective">{{ objective }}</li>
        </ul>
      </article>

      <article class="training-detail__section">
        <h2>参加予定者</h2>
        <ul class="participant-list">
          <li v-for="participant in training.participants" :key="participant.id">
            <RouterLink :to="`/participants/${participant.id}`">
              <span class="participant-list__name">{{ participant.name }}</span>
              <span class="participant-list__meta">{{ participant.department }} / {{ participant.role }}</span>
              <span class="participant-list__status" :data-status="participant.status">{{ participant.status }}</span>
            </RouterLink>
          </li>
        </ul>
        <p v-if="!training.participants.length" class="training-detail__empty">参加予定者がまだ登録されていません。</p>
      </article>
    </section>
  </section>
  <div v-else-if="loading" class="state">研修詳細を読み込んでいます...</div>
  <div v-else class="state state--error">{{ error }}</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  id: {
    type: String,
    required: false
  }
});

const route = useRoute();
const store = useStore();
const loading = ref(true);
const error = ref('');
const training = ref(null);

function getTrainingId() {
  return props.id || route.params.id;
}

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

async function loadTraining() {
  loading.value = true;
  error.value = '';
  try {
    const id = getTrainingId();
    const detail = await store.dispatch('loadTrainingDetail', id);
    training.value = detail;
  } catch (e) {
    error.value = e.message || '研修詳細の取得に失敗しました。';
  } finally {
    loading.value = false;
  }
}

onMounted(loadTraining);
watch(() => getTrainingId(), loadTraining);
</script>

<style scoped>
.training-detail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.breadcrumbs {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.95rem;
}

.breadcrumbs a {
  color: #2563eb;
  text-decoration: none;
}

.breadcrumbs a::after {
  content: '›';
  margin-left: 0.5rem;
  color: #94a3b8;
}

.breadcrumbs span {
  color: #64748b;
}

.breadcrumbs span::after {
  display: none;
}

.training-detail__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  background: #fff;
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 18px;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.07);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.training-detail__header h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: #0f172a;
}

.training-detail__category {
  margin: 0.4rem 0 0;
  font-weight: 600;
  color: #2563eb;
  letter-spacing: 0.05em;
}

.training-detail__schedule {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #475569;
  background: rgba(37, 99, 235, 0.06);
  padding: 1rem;
  border-radius: 14px;
  min-width: 220px;
}

.training-detail__schedule strong {
  color: #1d4ed8;
  margin-right: 0.35rem;
}

.training-detail__body {
  display: grid;
  gap: 1.5rem;
}

.training-detail__section {
  background: #fff;
  padding: clamp(1.3rem, 3vw, 1.8rem);
  border-radius: 16px;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.training-detail__section h2 {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
}

.training-detail__section p {
  margin: 0;
  line-height: 1.8;
  color: #475569;
}

.training-detail__section ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #334155;
  line-height: 1.7;
}

.participant-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.participant-list a {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.2rem;
  align-items: baseline;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: rgba(241, 245, 249, 0.9);
  text-decoration: none;
  color: #1e293b;
  transition: background 0.2s ease;
}

.participant-list a:hover {
  background: rgba(37, 99, 235, 0.1);
}

.participant-list__name {
  font-weight: 600;
}

.participant-list__meta {
  color: #64748b;
}

.participant-list__status {
  font-weight: 600;
  color: #1d4ed8;
}

.participant-list__status[data-status='修了'] {
  color: #16a34a;
}

.participant-list__status[data-status='受講予定'] {
  color: #f97316;
}

.training-detail__empty {
  margin: 0;
  color: #94a3b8;
}

.state {
  text-align: center;
  padding: 2rem;
  color: #475569;
}

.state--error {
  color: #dc2626;
}

@media (max-width: 960px) {
  .training-detail__schedule {
    width: 100%;
  }
}
</style>
