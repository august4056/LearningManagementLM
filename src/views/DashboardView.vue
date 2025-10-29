<template>
  <section class="dashboard">
    <div class="summary-grid">
      <article class="summary-card">
        <h2>研修数</h2>
        <p class="summary-card__value">{{ trainings.length }}</p>
        <p class="summary-card__description">公開中の研修プログラム</p>
      </article>
      <article class="summary-card">
        <h2>受講者数</h2>
        <p class="summary-card__value">{{ participants.length }}</p>
        <p class="summary-card__description">登録済みの受講者</p>
      </article>
      <article class="summary-card">
        <h2>受講中</h2>
        <p class="summary-card__value">{{ statusSummary['受講中'] || 0 }}</p>
        <p class="summary-card__description">現在研修を受講している人数</p>
      </article>
      <article class="summary-card">
        <h2>修了済み</h2>
        <p class="summary-card__value">{{ statusSummary['修了'] || 0 }}</p>
        <p class="summary-card__description">研修を修了した人数</p>
      </article>
    </div>

    <section class="panel" aria-labelledby="upcoming-trainings-heading">
      <div class="panel__header">
        <div>
          <h2 id="upcoming-trainings-heading">直近の研修予定</h2>
          <p class="panel__description">次に実施予定の研修を確認できます</p>
        </div>
        <RouterLink class="panel__link" to="/trainings">研修一覧を表示</RouterLink>
      </div>
      <div v-if="loading" class="panel__state">データを読み込んでいます...</div>
      <div v-else-if="error" class="panel__state panel__state--error">{{ error }}</div>
      <ul v-else class="panel__list">
        <li v-for="training in upcomingTrainings" :key="training.id" class="panel__list-item">
          <div class="panel__list-content">
            <h3>{{ training.title }}</h3>
            <p class="panel__meta">
              <span>{{ formatDate(training.startDate) }} 〜 {{ formatDate(training.endDate) }}</span>
              <span>担当: {{ training.instructor }}</span>
              <span>参加予定: {{ training.participants.length }} 名</span>
            </p>
            <p class="panel__description">{{ training.description }}</p>
          </div>
          <RouterLink class="panel__action" :to="`/trainings/${training.id}`">詳細を見る</RouterLink>
        </li>
      </ul>
      <p v-if="!loading && !error && !upcomingTrainings.length" class="panel__state">
        予定されている研修はありません。
      </p>
    </section>

    <section class="panel" aria-labelledby="department-summary-heading">
      <div class="panel__header">
        <div>
          <h2 id="department-summary-heading">部署別の受講状況</h2>
          <p class="panel__description">部署ごとの受講者数を確認できます</p>
        </div>
        <RouterLink class="panel__link" to="/participants">受講者一覧を表示</RouterLink>
      </div>
      <div v-if="loading" class="panel__state">データを読み込んでいます...</div>
      <div v-else-if="error" class="panel__state panel__state--error">{{ error }}</div>
      <table v-else class="department-table">
        <thead>
          <tr>
            <th scope="col">部署</th>
            <th scope="col">受講者数</th>
            <th scope="col">受講中</th>
            <th scope="col">修了</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="department in departmentSummary" :key="department.name">
            <th scope="row">{{ department.name }}</th>
            <td>{{ department.total }}</td>
            <td>{{ department.inProgress }}</td>
            <td>{{ department.completed }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!loading && !error && !departmentSummary.length" class="panel__state">
        受講者情報が登録されていません。
      </p>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loading = ref(true);
const error = ref('');

const trainings = computed(() => store.getters.trainings || []);
const participants = computed(() => store.getters.participants || []);

const statusSummary = computed(() =>
  participants.value.reduce(
    (acc, participant) => {
      acc[participant.status] = (acc[participant.status] || 0) + 1;
      return acc;
    },
    {}
  )
);

const upcomingTrainings = computed(() => {
  return [...trainings.value]
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);
});

const departmentSummary = computed(() => {
  const summary = participants.value.reduce((acc, participant) => {
    if (!acc[participant.department]) {
      acc[participant.department] = {
        name: participant.department,
        total: 0,
        inProgress: 0,
        completed: 0
      };
    }
    acc[participant.department].total += 1;
    if (participant.status === '受講中') acc[participant.department].inProgress += 1;
    if (participant.status === '修了') acc[participant.department].completed += 1;
    return acc;
  }, {});

  return Object.values(summary);
});

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
    await Promise.all([store.dispatch('loadTrainings'), store.dispatch('loadParticipants')]);
  } catch (e) {
    error.value = e.message || 'ダッシュボード情報の取得に失敗しました。';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 4vw, 2.5rem);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.summary-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.12);
}

.summary-card h2 {
  font-size: 1rem;
  margin: 0;
  color: #1d4ed8;
  letter-spacing: 0.05em;
}

.summary-card__value {
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 700;
  margin: 0.5rem 0 0.25rem;
  color: #0f172a;
}

.summary-card__description {
  margin: 0;
  color: #64748b;
}

.panel {
  background: #ffffff;
  border-radius: 18px;
  padding: clamp(1.5rem, 4vw, 2rem);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.panel__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.panel__header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.panel__description {
  margin: 0.3rem 0 0;
  color: #64748b;
}

.panel__link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.panel__link:hover {
  text-decoration: underline;
}

.panel__state {
  text-align: center;
  padding: 1.5rem;
  color: #475569;
}

.panel__state--error {
  color: #dc2626;
}

.panel__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.panel__list-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid rgba(37, 99, 235, 0.15);
  border-radius: 16px;
  padding: 1.25rem;
  background-color: rgba(248, 250, 252, 0.7);
}

.panel__list-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #1e293b;
}

.panel__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
}

.panel__meta span::before {
  content: '•';
  margin: 0 0.4rem;
  color: #94a3b8;
}

.panel__meta span:first-of-type::before {
  display: none;
}

.panel__description {
  margin: 0.75rem 0 0;
  color: #475569;
}

.panel__action {
  align-self: center;
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.panel__action:hover {
  background: #1d4ed8;
}

.department-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}

.department-table th,
.department-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(148, 163, 184, 0.3);
}

.department-table tbody tr:hover {
  background-color: rgba(226, 232, 240, 0.3);
}

@media (max-width: 768px) {
  .panel__header {
    flex-direction: column;
    align-items: stretch;
  }

  .panel__link {
    width: 100%;
    justify-content: center;
    padding: 0.65rem 0;
    border-radius: 999px;
    border: 1px solid rgba(37, 99, 235, 0.4);
  }

  .panel__action {
    width: 100%;
    text-align: center;
  }
}
</style>
