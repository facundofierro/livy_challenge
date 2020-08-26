/* eslint-disable no-console */
/*
 * Process all routes
 *
 */

import { Router } from 'express';
import { getPoliciesByUserName } from '../controllers/policyController';
import { tokenVerify, isAdmin } from '../middlewares';

const router = Router();

// get policies by user name
router.get('/client_name/:name', tokenVerify, isAdmin, async (req, res) => {
  try {
    const result = getPoliciesByUserName(req.params.name);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ mensaje: e.message });
  }
});

export default router;
