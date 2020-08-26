
const express = require('express');
const login = require('../controllers/loginController');

const router = express.Router();


 // login 
 router.post('/', async (req, res) => {
    try {
        let result = await login.authenticate(req.body.user, req.body.password);        
        res.send(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e);
    }
})


module.exports = router;