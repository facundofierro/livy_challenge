/* eslint-disable no-console */
import { Router } from 'express';
import { getById, getByName, getByPolicyId } from '../controllers/clientController';

// middlewares
import { tokenVerify, isAdmin } from '../middlewares';

const router = Router();

// get clients by id
router.get('/id/:id', tokenVerify, async (req, res) => {
  try {
    const result = await getById(req.params.id);
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e);
  }
});

// get clients by name
router.get('/name/:name', tokenVerify, async (req, res) => {
  try {
    const result = await getByName(req.params.name);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e);
  }
});

// get client by policy id
router.get('/policy_id/:id', tokenVerify, isAdmin, async (req, res) => {
  try {
    const result = await getByPolicyId(req.params.id);
    res.json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ mensaje: e.message });
  }
});

export default router;
