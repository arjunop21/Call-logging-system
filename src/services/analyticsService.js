// src/services/analyticsService.js
import CallLog from '../models/CallLog.js';

const getDailyCalls = async (startDate, endDate) => {

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
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$timestamp',
                        },
                    },
                },
                count: { $sum: 1 },
                totalDuration: { $sum: '$duration' },
            },
        },
        {
            $sort: { '_id.date': -1 }, // Sort by date in descending order
        },
    ]);
};

const getMonthlyCalls = async (year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

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
        {
            $sort: { '_id': 1 }, // Sort by officerId
        },
    ]);
};

export default { getDailyCalls, getMonthlyCalls };