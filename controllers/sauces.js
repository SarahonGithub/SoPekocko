//Importer le modeel Mongoose
const Sauce = require('../models/sauce');
const fs = require('fs');


//Ajouter une nouvelle sauce 

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
const sauce = new Sauce({
  ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
});
sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
}


//Afficher une sauce

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
.then(sauce => res.status(200).json(sauce))
.catch(error => res.status(404).json({ error }));
};


//Modifier une sauce

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


//Supprimer une sauce

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


//Afficher toutes les sauces

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({ error }));
};


//Liker ou disliker une sauce

exports.likeDislike = (req, res, next) => {
  
  Sauce.findOne({ _id: req.params.id })

  .then(sauce => {

  const liking = req.body.like;
  const userWhoLikes = req.body.userId;
  const indexLike = sauce.usersLiked.indexOf(userWhoLikes)
  const indexDislike = sauce.usersDisliked.indexOf(userWhoLikes)
    
          if(liking === 1 && sauce.usersLiked.indexOf(userWhoLikes) === -1){
              sauce.usersLiked.push(userWhoLikes);
              sauce.likes += 1;
          }

          else if(liking === -1 && sauce.usersDisliked.indexOf(userWhoLikes === -1) ){
              sauce.usersDisliked.push(userWhoLikes);
              sauce.dislikes += 1;
          }

          
          else if(liking === 0 && indexLike > -1){
              sauce.usersLiked.splice(indexLike, 1);
              sauce.likes += -1;
          }

          
          else if(liking === 0 && indexDislike > -1){
              sauce.usersDisliked.splice(indexDislike, 1);
              sauce.dislikes += -1;
          }

          sauce.save()
              .then(() => {
                res.status(200).json({ message: 'Sauce likée !' })
              })
              
              .catch(error => res.status(500).json({ error }));
        })

        .catch(error => res.status(500).json({error}))
  
      }
