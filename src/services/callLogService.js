// src/services/callLogService.js
import CallLog from '../models/CallLog.js';
import Client from '../models/Client.js';
import Officer from '../models/Officer.js';

const createCallLog = async (data) => {
  const session = await CallLog.startSession();
  try {
    session.startTransaction();

    const callLog = await CallLog.create([data], { session });

    // Update client interaction history
    await Client.findByIdAndUpdate(
      data.clientId,
      {
        $push: {
          interactionHistory: {
            callLogId: callLog[0]._id,
            outcome: data.outcome,
            timestamp: data.timestamp,
          },
        },
      },
      { session }
    );

    // Update officer interaction history
    await Officer.findByIdAndUpdate(
      data.officerId,
      {
        $push: {
          interactionHistory: {
            callLogId: callLog[0]._id,
            outcome: data.outcome,
            timestamp: data.timestamp,
          },
        },
      },
      { session }
    );

    await session.commitTransaction();
    return callLog[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getCallLogsByOfficer = async (officerId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    CallLog.find({ officerId })
      .populate('clientId')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit),

    CallLog.countDocuments({ officerId }),
  ]);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data,
  };
};


export default { createCallLog, getCallLogsByOfficer };