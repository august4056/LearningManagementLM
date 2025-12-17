import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { trainings, participants } from '../data.mjs';
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
  const training = trainings.find((item) => item.id === id);
  if (!training) {
    throw createError({
      statusCode: 404,
      statusMessage: "Training not found"
    });
  }
  const attendeeDetails = training.participantIds.map((participantId) => {
    const participant = participants.find((item) => item.id === participantId);
    return participant ? {
      id: participant.id,
      name: participant.name,
      department: participant.department,
      role: participant.role,
      status: participant.status
    } : null;
  }).filter(Boolean);
  return {
    ...training,
    participants: attendeeDetails
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
