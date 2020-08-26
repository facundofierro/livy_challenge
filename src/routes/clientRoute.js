/* eslint-disable no-console */
import express from 'express';
import clientController from '../controllers/clientController.js';

// middlewares
import middlewares from '../middlewares.js';

const router = express.Router();

// get clients by id
router.get('/id/:id', middlewares.tokenVerify, async (req, res) => {
  try {
    const result = await clientController.getById(req.params.id);
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e);
  }
});

// get clients by name
router.get('/name/:name', middlewares.tokenVerify, async (req, res) => {
  try {
    const result = await clientController.getByName(req.params.name);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e);
  }
});

// get client by policy id
router.get('/policy_id/:id', middlewares.tokenVerify, middlewares.isAdmin, async (req, res) => {
  try {
    const result = await clientController.getByPolicyId(req.params.id);
    res.json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ mensaje: e.message });
  }
});

export default router;
