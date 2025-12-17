import { d as defineEventHandler } from '../../_/nitro.mjs';
import { participants, trainings } from './data.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const participants_get = defineEventHandler(() => {
  return participants.map((participant) => ({
    ...participant,
    trainings: participant.trainingIds.map((id) => {
      const training = trainings.find((item) => item.id === id);
      return training ? {
        id: training.id,
        title: training.title,
        startDate: training.startDate,
        endDate: training.endDate
      } : null;
    }).filter(Boolean)
  }));
});

export { participants_get as default };
//# sourceMappingURL=participants.get.mjs.map
