//Importer Express
const express = require('express');
require('dotenv').config();

//Pour rendre le corps de la requqête POST facilement exploitable
const bodyParser = require('body-parser');

//Facilite les intéractions avec notre base de données
const mongoose = require('mongoose');

const path = require('path');

//Importer les routers
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://'+process.env.LOGIN+':'+process.env.PASSWORD+"@"+process.env.URL,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    
//Créer une applicaiton Express 
const app = express();

//Premier middleware général éxécuté par le servre, permet à l'application d'accéder à l'api sans erreur CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Transformer le corps de la requête en json utilisable
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//Enregistrer les routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//Exporter l'application pour pouvoir y accéder depuis les autres fichiers
module.exports = app;