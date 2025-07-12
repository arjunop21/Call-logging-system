// src/services/analyticsService.js
import CallLog from '../models/CallLog.js';

const getDailyCalls = async (startDate, endDate, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    return CallLog.aggregate([
        {
            $match: {
                timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
            },
        },
        {
            $group: {
                _id: {
                    officerId: '$officerId',
                    date: {
                        $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
                    },
                },
                count: { $sum: 1 },
                totalDuration: { $sum: '$duration' },
            },
        },
        { $sort: { '_id.date': -1 } },
        {
            $facet: {
                metadata: [{ $count: 'total' }],
                data: [{ $skip: skip }, { $limit: limit }],
            },
        },
        {
            $unwind: {
                path: '$metadata',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                total: '$metadata.total',
                data: 1,
            },
        },
    ]);
};

const getMonthlyCalls = async (year, month, page = 1, limit = 10) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const skip = (page - 1) * limit;

    return CallLog.aggregate([
        {
            $match: {
                timestamp: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: '$officerId',
                count: { $sum: 1 },
                totalDuration: { $sum: '$duration' },
            },
        },
        { $sort: { '_id': 1 } },
        {
            $facet: {
                metadata: [{ $count: 'total' }],
                data: [{ $skip: skip }, { $limit: limit }],
            },
        },
        {
            $unwind: {
                path: '$metadata',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                total: '$metadata.total',
                data: 1,
            },
        },
    ]);
};


export default { getDailyCalls, getMonthlyCalls };