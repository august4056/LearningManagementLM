<template>
  <section class="trainings">
    <header class="trainings__header">
      <div>
        <h1>研修一覧</h1>
        <p>研修プログラムの概要と参加状況を確認できます</p>
      </div>
      <div class="trainings__summary">
        <span>全{{ trainings.length }}件</span>
        <span>受講者延べ {{ totalParticipants }} 名</span>
      </div>
    </header>

    <div v-if="loading" class="state">研修情報を読み込んでいます...</div>
    <div v-else-if="error" class="state state--error">{{ error }}</div>

    <ul v-else class="training-list">
      <li v-for="training in trainings" :key="training.id" class="training-card">
        <div class="training-card__content">
          <h2>{{ training.title }}</h2>
          <p class="training-card__category">カテゴリー: {{ training.category }}</p>
          <p class="training-card__description">{{ training.description }}</p>
          <dl class="training-card__meta">
            <div>
              <dt>期間</dt>
              <dd>{{ formatDate(training.startDate) }} 〜 {{ formatDate(training.endDate) }}</dd>
            </div>
            <div>
              <dt>会場</dt>
              <dd>{{ training.location }}</dd>
            </div>
            <div>
              <dt>講師</dt>
              <dd>{{ training.instructor }}</dd>
            </div>
          </dl>
        </div>
        <div class="training-card__sidebar">
          <h3>参加予定</h3>
          <ul>
            <li v-for="participant in training.participants" :key="participant.id">
              <RouterLink :to="`/participants/${participant.id}`">
                {{ participant.name }} ({{ participant.status }})
              </RouterLink>
            </li>
          </ul>
          <RouterLink class="training-card__link" :to="`/trainings/${training.id}`">詳細を見る</RouterLink>
        </div>
      </li>
    </ul>

    <p v-if="!loading && !error && !trainings.length" class="state">登録されている研修はありません。</p>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loading = ref(true);
const error = ref('');

const trainings = computed(() => store.getters.trainings || []);
const totalParticipants = computed(() =>
  trainings.value.reduce((acc, training) => acc + training.participants.length, 0)
);

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

onMounted(async () => {
  try {
    await store.dispatch('loadTrainings');
  } catch (e) {
    error.value = e.message || '研修情報の取得に失敗しました。';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.trainings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.trainings__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.trainings__header h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.2rem);
}

.trainings__header p {
  margin: 0.3rem 0 0;
  color: #64748b;
}

.trainings__summary {
  display: flex;
  gap: 1rem;
  font-weight: 600;
  color: #1d4ed8;
}

.state {
  text-align: center;
  padding: 2rem;
  color: #475569;
}

.state--error {
  color: #dc2626;
}

.training-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.training-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 1.5rem;
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.07);
  padding: clamp(1.5rem, 4vw, 2rem);
}

.training-card__content h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(1.4rem, 3vw, 1.8rem);
}

.training-card__category {
  margin: 0.35rem 0;
  color: #2563eb;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.training-card__description {
  margin: 0.75rem 0;
  color: #475569;
  line-height: 1.6;
}

.training-card__meta {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}

.training-card__meta div {
  background: rgba(37, 99, 235, 0.06);
  border-radius: 12px;
  padding: 0.75rem;
}

.training-card__meta dt {
  font-weight: 600;
  color: #1d4ed8;
}

.training-card__meta dd {
  margin: 0.4rem 0 0;
  color: #334155;
}

.training-card__sidebar {
  background: rgba(241, 245, 249, 0.9);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.training-card__sidebar h3 {
  margin: 0;
  font-size: 1.1rem;
}

.training-card__sidebar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.training-card__sidebar a {
  color: #2563eb;
  text-decoration: none;
}

.training-card__sidebar a:hover {
  text-decoration: underline;
}

.training-card__link {
  margin-top: auto;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.training-card__link:hover {
  background: #1d4ed8;
}

@media (max-width: 960px) {
  .training-card {
    grid-template-columns: 1fr;
  }

  .training-card__sidebar {
    flex-direction: column;
  }
}
</style>
