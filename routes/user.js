//Créer un rooter avec Express
const express = require('express');
const router = express.Router();


//Récupérer le controllers pour associer les fonctions aux routes
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;