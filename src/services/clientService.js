// src/services/clientService.js
import Client from '../models/Client.js';

const createClient = async (data) => {
  return Client.create(data);
};

const getClientById = async (id, page = 1, limit = 50) => {
  return Client.findById(id).populate({
    path: 'interactionHistory.callLogId',
    select: 'duration type outcome comment timestamp',
    options: { skip: (page - 1) * limit, limit },
  });
};

export default { createClient, getClientById };