// src/services/officerService.js
import Officer from '../models/Officer.js';

const createOfficer = async (data) => {
  return Officer.create(data);
};

const getOfficerById = async (id) => {
  return Officer.findById(id).populate({
    path: 'interactionHistory.callLogId',
    select: 'clientId duration type outcome comment timestamp',
  });
};

export default { createOfficer, getOfficerById };