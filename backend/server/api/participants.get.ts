import { participants, trainings } from './data';

export default defineEventHandler(() => {
  return participants.map((participant) => ({
    ...participant,
    trainings: participant.trainingIds.map((id) => {
      const training = trainings.find((item) => item.id === id);
      return training
        ? {
            id: training.id,
            title: training.title,
            startDate: training.startDate,
            endDate: training.endDate
          }
        : null;
    }).filter(Boolean)
  }));
});
