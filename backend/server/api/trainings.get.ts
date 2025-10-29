import { trainings, participants } from './data';

export default defineEventHandler(() => {
  return trainings.map((training) => ({
    ...training,
    participants: training.participantIds.map((id) => {
      const participant = participants.find((item) => item.id === id);
      return participant
        ? {
            id: participant.id,
            name: participant.name,
            department: participant.department,
            status: participant.status
          }
        : null;
    }).filter(Boolean)
  }));
});
