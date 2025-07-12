// src/services/officerService.js
import Officer from '../models/Officer.js';
import mongoose from 'mongoose';

const createOfficer = async (data) => {
  return Officer.create(data);
};

const getOfficerById = async (id, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const officerObjectId = new mongoose.Types.ObjectId(id);

  const result = await Officer.aggregate([
    { $match: { _id: officerObjectId } },
    {
      $project: {
        name: 1,
        'contactInfo.email': 1,
        'contactInfo.phone': 1,
        region: 1,
        status: 1,
        interactionHistory: { $slice: ['$interactionHistory', skip, limit] }
      }
    },
    { $unwind: '$interactionHistory' },
    {
      $lookup: {
        from: 'calllogs',
        localField: 'interactionHistory.callLogId',
        foreignField: '_id',
        as: 'interactionHistory.callLog'
      }
    },
    {
      $unwind: {
        path: '$interactionHistory.callLog',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        email: { $first: '$contactInfo.email' },
        phone: { $first: '$contactInfo.phone' },
        region: { $first: '$region' },
        status: { $first: '$status' },
        interactionHistory: { $push: '$interactionHistory' }
      }
    }
  ]);

  return result[0];

};

export default { createOfficer, getOfficerById };