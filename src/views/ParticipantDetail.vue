<template>
  <section class="participant-detail" v-if="!loading && participant">
    <nav class="breadcrumbs" aria-label="パンくずリスト">
      <RouterLink to="/dashboard">ホーム</RouterLink>
      <RouterLink to="/participants">受講者一覧</RouterLink>
      <span aria-current="page">{{ participant.name }}</span>
    </nav>

    <header class="participant-detail__header">
      <div class="participant-detail__identity">
        <h1>{{ participant.name }}</h1>
        <p>{{ participant.department }} / {{ participant.role }}</p>
      </div>
      <div class="participant-detail__status" :data-status="participant.status">{{ participant.status }}</div>
    </header>

    <section class="participant-detail__body">
      <article class="participant-detail__section">
        <h2>基本情報</h2>
        <dl>
          <div>
            <dt>メール</dt>
            <dd>{{ participant.email }}</dd>
          </div>
          <div>
            <dt>在籍開始</dt>
            <dd>{{ formatDate(participant.joinedAt) }}</dd>
          </div>
          <div>
            <dt>メモ</dt>
            <dd>{{ participant.notes }}</dd>
          </div>
        </dl>
      </article>

      <article class="participant-detail__section">
        <h2>受講履歴・予定</h2>
        <ul class="training-history">
          <li v-for="training in participant.trainings" :key="training.id">
            <RouterLink :to="`/trainings/${training.id}`">
              <div>
                <h3>{{ training.title }}</h3>
                <p>{{ training.category }} / {{ training.instructor }}</p>
              </div>
              <span>{{ formatDate(training.startDate) }} 〜 {{ formatDate(training.endDate) }}</span>
            </RouterLink>
          </li>
        </ul>
        <p v-if="!participant.trainings.length" class="participant-detail__empty">受講履歴が登録されていません。</p>
      </article>
    </section>
  </section>
  <div v-else-if="loading" class="state">受講者詳細を読み込んでいます...</div>
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
const participant = ref(null);

function getParticipantId() {
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

async function loadParticipant() {
  loading.value = true;
  error.value = '';
  try {
    const id = getParticipantId();
    const detail = await store.dispatch('loadParticipantDetail', id);
    participant.value = detail;
  } catch (e) {
    error.value = e.message || '受講者詳細の取得に失敗しました。';
  } finally {
    loading.value = false;
  }
}

onMounted(loadParticipant);
watch(() => getParticipantId(), loadParticipant);
</script>

<style scoped>
.participant-detail {
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

.participant-detail__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 18px;
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.07);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.participant-detail__identity h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
}

.participant-detail__identity p {
  margin: 0.3rem 0 0;
  color: #475569;
}

.participant-detail__status {
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
}

.participant-detail__status[data-status='修了'] {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.participant-detail__status[data-status='受講予定'] {
  background: rgba(249, 115, 22, 0.12);
  color: #ea580c;
}

.participant-detail__body {
  display: grid;
  gap: 1.5rem;
}

.participant-detail__section {
  background: #fff;
  padding: clamp(1.3rem, 3vw, 1.8rem);
  border-radius: 16px;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.participant-detail__section h2 {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
}

.participant-detail__section dl {
  margin: 0;
  display: grid;
  gap: 0.85rem;
}

.participant-detail__section dt {
  font-weight: 600;
  color: #1d4ed8;
}

.participant-detail__section dd {
  margin: 0.3rem 0 0;
  color: #475569;
}

.training-history {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.training-history a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: rgba(241, 245, 249, 0.9);
  text-decoration: none;
  color: #1e293b;
  transition: background 0.2s ease;
}

.training-history a:hover {
  background: rgba(37, 99, 235, 0.1);
}

.training-history h3 {
  margin: 0;
  font-size: 1.05rem;
}

.training-history p {
  margin: 0.2rem 0 0;
  color: #64748b;
}

.participant-detail__empty {
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
</style>
