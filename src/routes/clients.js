// src/routes/clients.js
import { Router } from 'express';
import clientService from '../services/clientService.js'; // Corrected import

const router = Router();

// POST /api/clients - Create a new client
router.post('/', async (req, res, next) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
});

// GET /api/clients/:id - Get client by ID
router.get('/:id', async (req, res, next) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    next(error);
  }
});

export default router;