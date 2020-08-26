/* eslint-disable no-console */
import { Router } from 'express';
import { authenticate } from '../controllers/loginController';

const router = Router();

// login
router.post('/', async (req, res) => {
  try {
    const result = await authenticate(req.body.user, req.body.password);
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e);
  }
});

export default router;
