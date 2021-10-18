// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

// ************ Routes ************
router.get('/', mainController.index)
router.get('/register', mainController.register)
router.get('/login', mainController.login)




module.exports = router;