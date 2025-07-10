// Defining routes for officer management
import { Router } from 'express';
const router = Router();
import officerService  from '../services/officerService.js';

router.post('/', async (req, res, next) => {
  try {
    const officer = await officerService.createOfficer(req.body);
    res.status(201).json(officer);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const officer = await officerService.getOfficerById(req.params.id);
    res.json(officer);
  } catch (error) {
    next(error);
  }
});

export default router;