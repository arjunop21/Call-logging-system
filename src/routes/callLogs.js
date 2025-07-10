// src/routes/callLogs.js
import express from 'express';
import callLogService from '../services/callLogService.js';
import analyticsService from '../services/analyticsService.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const callLog = await callLogService.createCallLog(req.body);
    res.status(201).json(callLog);
  } catch (error) {
    next(error);
  }
});

router.get('/officer/:officerId', async (req, res, next) => {
  try {
    const callLogs = await callLogService.getCallLogsByOfficer(req.params.officerId);
    res.json(callLogs);
  } catch (error) {
    next(error);
  }
});

router.get('/analytics/daily', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    const analytics = await analyticsService.getDailyCalls(startDate, endDate);
    res.json(analytics);
  } catch (error) {
    next(error);
  }
});

router.get('/analytics/monthly', async (req, res, next) => {
  try {
    const { year, month } = req.query;
    if (!year || !month) {
      return res.status(400).json({ error: 'year and month are required' });
    }
    const analytics = await analyticsService.getMonthlyCalls(Number(year), Number(month));
    res.json(analytics);
  } catch (error) {
    next(error);
  }
});

export default router;