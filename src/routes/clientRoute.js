
const express = require('express');
const clientController = require('../controllers/clientController.js');

//middlewares
const tokenVerify = require('../middlewares.js').tokenVerify;
const isAdmin = require('../middlewares.js').isAdmin;

const router = express.Router();


// get clients by id
router.get('/id/:id', tokenVerify, async (req, res) => {
    try {
        let result = await clientController.getById(req.params.id);
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
        let result = await clientController.getByName(req.params.name);
        res.send(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e);
    }
});

// get client by policy id
router.get('/policy_id/:id', tokenVerify, isAdmin, async (req, res) => {
    try {
        let result = await clientController.getByPolicyId(req.params.id);
        res.json(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ mensaje: e.message});
    }
});


module.exports = router;