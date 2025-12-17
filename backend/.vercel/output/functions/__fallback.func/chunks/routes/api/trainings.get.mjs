import { d as defineEventHandler } from '../../_/nitro.mjs';
import { trainings, participants } from './data.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const trainings_get = defineEventHandler(() => {
  return trainings.map((training) => ({
    ...training,
    participants: training.participantIds.map((id) => {
      const participant = participants.find((item) => item.id === id);
      return participant ? {
        id: participant.id,
        name: participant.name,
        department: participant.department,
        status: participant.status
      } : null;
    }).filter(Boolean)
  }));
});

export { trainings_get as default };
//# sourceMappingURL=trainings.get.mjs.map
