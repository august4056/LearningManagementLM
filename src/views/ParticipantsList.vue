<template>
  <section class="participants">
    <header class="participants__header">
      <div>
        <h1>受講者一覧</h1>
        <p>部署・受講状況ごとに受講者の情報を確認できます</p>
      </div>
      <div class="participants__summary">
        <span>登録者 {{ participants.length }} 名</span>
        <span>受講中 {{ inProgressCount }} 名</span>
        <span>修了 {{ completedCount }} 名</span>
      </div>
    </header>

    <div v-if="loading" class="state">受講者情報を読み込んでいます...</div>
    <div v-else-if="error" class="state state--error">{{ error }}</div>

    <ul v-else class="participant-grid">
      <li v-for="participant in participants" :key="participant.id" class="participant-card">
        <div class="participant-card__header">
          <h2>{{ participant.name }}</h2>
          <span class="participant-card__status" :data-status="participant.status">{{ participant.status }}</span>
        </div>
        <p class="participant-card__meta">{{ participant.department }} / {{ participant.role }}</p>
        <p class="participant-card__email">{{ participant.email }}</p>
        <p class="participant-card__notes">{{ participant.notes }}</p>
        <div class="participant-card__trainings">
          <h3>受講・予定研修</h3>
          <ul>
            <li v-for="training in participant.trainings" :key="training.id">
              <RouterLink :to="`/trainings/${training.id}`">
                {{ training.title }}（{{ formatDate(training.startDate) }}〜{{ formatDate(training.endDate) }}）
              </RouterLink>
            </li>
          </ul>
        </div>
        <RouterLink class="participant-card__link" :to="`/participants/${participant.id}`">詳細を見る</RouterLink>
      </li>
    </ul>

    <p v-if="!loading && !error && !participants.length" class="state">受講者の登録がありません。</p>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loading = ref(true);
const error = ref('');

const participants = computed(() => store.getters.participants || []);
const inProgressCount = computed(() => participants.value.filter((p) => p.status === '受講中').length);
const completedCount = computed(() => participants.value.filter((p) => p.status === '修了').length);

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
    await store.dispatch('loadParticipants');
  } catch (e) {
    error.value = e.message || '受講者情報の取得に失敗しました。';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.participants {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.participants__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.participants__header h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.3rem);
}

.participants__header p {
  margin: 0.3rem 0 0;
  color: #64748b;
}

.participants__summary {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-weight: 600;
  color: #0f172a;
}

.participants__summary span {
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.08);
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

.participant-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.participant-card {
  background: #fff;
  border-radius: 18px;
  padding: clamp(1.3rem, 3vw, 1.8rem);
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 16px 38px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.participant-card__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.participant-card__header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.participant-card__status {
  font-weight: 700;
  color: #1d4ed8;
}

.participant-card__status[data-status='修了'] {
  color: #16a34a;
}

.participant-card__status[data-status='受講予定'] {
  color: #f97316;
}

.participant-card__meta {
  margin: 0;
  color: #475569;
}

.participant-card__email {
  margin: 0;
  color: #2563eb;
  font-weight: 600;
}

.participant-card__notes {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.participant-card__trainings h3 {
  margin: 0 0 0.4rem;
  font-size: 1.05rem;
}

.participant-card__trainings ul {
  margin: 0;
  padding-left: 1.1rem;
  color: #334155;
  line-height: 1.6;
}

.participant-card__trainings a {
  color: #2563eb;
  text-decoration: none;
}

.participant-card__trainings a:hover {
  text-decoration: underline;
}

.participant-card__link {
  margin-top: auto;
  align-self: flex-start;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.participant-card__link:hover {
  background: #1d4ed8;
}
</style>
