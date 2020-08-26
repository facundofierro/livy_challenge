/*
* Process all routes
*
*/

const express = require('express');
const policyController = require('../controllers/policyController.js');

//middlewares
const tokenVerify = require('../middlewares.js').tokenVerify;
const isAdmin = require('../middlewares.js').isAdmin;

const router = express.Router();


// get policies by user name 
router.get('/client_name/:name', tokenVerify, isAdmin, async (req, res) => {
    try {
        let result = await policyController.getPoliciesByUserName(req.params.name);
        res.send(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ mensaje: e.message});
    }
});


module.exports = router;