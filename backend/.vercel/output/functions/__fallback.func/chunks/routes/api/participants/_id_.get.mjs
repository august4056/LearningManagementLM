import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { participants, trainings } from '../data.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const _id__get = defineEventHandler((event) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  const participant = participants.find((item) => item.id === id);
  if (!participant) {
    throw createError({
      statusCode: 404,
      statusMessage: "Participant not found"
    });
  }
  const attendedTrainings = participant.trainingIds.map((trainingId) => {
    const training = trainings.find((item) => item.id === trainingId);
    return training ? {
      id: training.id,
      title: training.title,
      category: training.category,
      startDate: training.startDate,
      endDate: training.endDate,
      instructor: training.instructor
    } : null;
  }).filter(Boolean);
  return {
    ...participant,
    trainings: attendedTrainings
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
