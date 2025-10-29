import { participants, trainings } from '../data';

export default defineEventHandler((event) => {
  const id = event.context.params?.id;
  const participant = participants.find((item) => item.id === id);

  if (!participant) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Participant not found'
    });
  }

  const attendedTrainings = participant.trainingIds
    .map((trainingId) => {
      const training = trainings.find((item) => item.id === trainingId);
      return training
        ? {
            id: training.id,
            title: training.title,
            category: training.category,
            startDate: training.startDate,
            endDate: training.endDate,
            instructor: training.instructor
          }
        : null;
    })
    .filter(Boolean);

  return {
    ...participant,
    trainings: attendedTrainings
  };
});
