import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();

// login
router.post('/', async (req, res) => {
  try {
    const result = await loginController.authenticate(req.body.user, req.body.password);
    if (result.success) res.send(result);
    else res.status(400).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e);
  }
});

export default router;
