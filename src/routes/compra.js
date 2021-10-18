// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const compraController = require('../controllers/compraController');

// ************ Routes ************
router.get('/', compraController.compra)




module.exports = router;