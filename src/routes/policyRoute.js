/* eslint-disable no-console */
/*
 * Process all routes
 *
 */

import express from 'express';
import policyController from '../controllers/policyController.js';
import middlewares from '../middlewares.js';

const router = express.Router();

// get policies by user name
router.get('/client_name/:name', middlewares.tokenVerify, middlewares.isAdmin, async (req, res) => {
  try {
    const result = policyController.getPoliciesByUserName(req.params.name);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ mensaje: e.message });
  }
});

export default router;
