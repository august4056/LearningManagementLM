import { trainings, participants } from '../data';

export default defineEventHandler((event) => {
  const id = event.context.params?.id;
  const training = trainings.find((item) => item.id === id);

  if (!training) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Training not found'
    });
  }

  const attendeeDetails = training.participantIds
    .map((participantId) => {
      const participant = participants.find((item) => item.id === participantId);
      return participant
        ? {
            id: participant.id,
            name: participant.name,
            department: participant.department,
            role: participant.role,
            status: participant.status
          }
        : null;
    })
    .filter(Boolean);

  return {
    ...training,
    participants: attendeeDetails
  };
});
