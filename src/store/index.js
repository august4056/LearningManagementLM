import { createStore } from 'vuex';
import {
  fetchTrainings,
  fetchTrainingById,
  fetchParticipants,
  fetchParticipantById
} from '@/services/api';

export default createStore({
  state: () => ({
    trainings: [],
    participants: [],
    trainingsLoaded: false,
    participantsLoaded: false,
    loading: false,
    error: null
  }),
  getters: {
    trainings: (state) => state.trainings,
    participants: (state) => state.participants,
    getTrainingById: (state) => (id) => state.trainings.find((item) => item.id === id),
    getParticipantById: (state) => (id) => state.participants.find((item) => item.id === id),
    loading: (state) => state.loading,
    error: (state) => state.error
  },
  mutations: {
    setTrainings(state, trainings) {
      state.trainings = trainings;
      state.trainingsLoaded = true;
    },
    setParticipants(state, participants) {
      state.participants = participants;
      state.participantsLoaded = true;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setError(state, message) {
      state.error = message;
    }
  },
  actions: {
    async loadTrainings({ commit, state }) {
      if (state.trainingsLoaded) {
        return state.trainings;
      }
      commit('setLoading', true);
      commit('setError', null);
      try {
        const trainings = await fetchTrainings();
        commit('setTrainings', trainings);
        return trainings;
      } catch (error) {
        commit('setError', error.message || '研修情報の取得に失敗しました。');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    async loadParticipants({ commit, state }) {
      if (state.participantsLoaded) {
        return state.participants;
      }
      commit('setLoading', true);
      commit('setError', null);
      try {
        const participants = await fetchParticipants();
        commit('setParticipants', participants);
        return participants;
      } catch (error) {
        commit('setError', error.message || '受講者情報の取得に失敗しました。');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    async loadTrainingDetail({ commit }, id) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const training = await fetchTrainingById(id);
        return training;
      } catch (error) {
        commit('setError', error.message || '研修詳細の取得に失敗しました。');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    async loadParticipantDetail({ commit }, id) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const participant = await fetchParticipantById(id);
        return participant;
      } catch (error) {
        commit('setError', error.message || '受講者詳細の取得に失敗しました。');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    }
  }
});
