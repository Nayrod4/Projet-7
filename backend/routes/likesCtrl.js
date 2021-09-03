// Imports
const models   = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

// Constants
const DISLIKED = 0;
const LIKED    = 1;

// Routes
module.exports = {
  likePost: function(req, res) {
    // Idenfication de l'user
    let headerAuth  = req.headers['authorization'];
    let userId      = jwtUtils.getUserId(headerAuth);

    // Params
    let messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
      return res.status(400).json({ 'error': 'paramètres invalide' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Message.findOne({
          where: { id: messageId }
        })
        .then(function(messageFound) {
          done(null, messageFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'Impossible de vérifier le message' });
        });
      },
      function(messageFound, done) {
        if(messageFound) {
          models.User.findOne({
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, messageFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'Impossible de tourver l\'utilisateur' });
          });
        } else {
          res.status(404).json({ 'error': 'Post déjà liker' });
        }
      },
      function(messageFound, userFound, done) {
        if(userFound) {
          models.Like.findOne({
            where: {
              userId: userId,
              messageId: messageId
            }
          })
          .then(function(userAlreadyLikedFound) {
            done(null, messageFound, userFound, userAlreadyLikedFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'Impossible de vérifier si l\'utilisateur à déjà liker le post' });
          });
        } else {
          res.status(404).json({ 'error': 'L\'utilisateur n\'existe pas' });
        }
      },
      function(messageFound, userFound, userAlreadyLikedFound, done) {
        if(!userAlreadyLikedFound) {
          models.Like.create({
            userId: userId,
            messageId: messageId,
            isLike  : 1,
          })
          .then(function(newMessage) {
            done(null, messageFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'Impossible de mettre un like1'+err });
          });
        } else {
          if (userAlreadyLikedFound.isLike === DISLIKED) {
            userAlreadyLikedFound.update({
              isLike: LIKED,
            }).then(function() {
              done(null, messageFound, userFound);
            }).catch(function(err) {
              res.status(500).json({ 'error': 'Impossible de mettre un like2' });
            });
          } else {
            res.status(409).json({ 'error': 'Message déjà liker' });
          }
        }
      },
      function(messageFound, userFound, done) {
        messageFound.update({
          likes: messageFound.likes + 1,
        }).then(function() {
          done(messageFound);
        }).catch(function(err) {
          res.status(500).json({ 'error': 'Impossible de mettre à jour le compteur de like' });
        });
      },
    ], function(messageFound) {
      if (messageFound) {
        return res.status(201).json(messageFound);
      } else {
        return res.status(500).json({ 'error': 'Impossible de mettre à jour le message' });
      }
    });
  },
  dislikePost: function(req, res) {
   // Getting auth header
   const headerAuth  = req.headers['authorization'];
   const userId      = jwtUtils.getUserId(headerAuth);

   // Params
   const messageId = parseInt(req.params.messageId);

   if (messageId <= 0) {
     return res.status(400).json({ 'error': 'Paramètres invalide' });
   }

   asyncLib.waterfall([
    function(done) {
       models.Message.findOne({
         where: { id: messageId }
       })
       .then(function(messageFound) {
         done(null, messageFound);
       })
       .catch(function(err) {
         return res.status(500).json({ 'error': 'Impossible de vérifier le message' });
       });
     },
     function(messageFound, done) {
       if(messageFound) {
         models.User.findOne({
           where: { id: userId }
         })
         .then(function(userFound) {
           done(null, messageFound, userFound);
         })
         .catch(function(err) {
           return res.status(500).json({ 'error': 'Impossible de vérifier l\'utilisateur' });
         });
       } else {
         res.status(404).json({ 'error': 'Post déjà liker' });
       }
     },
     function(messageFound, userFound, done) {
       if(userFound) {
         models.Like.findOne({
           where: {
             userId: userId,
             messageId: messageId
           }
         })
         .then(function(userAlreadyLikedFound) {
            done(null, messageFound, userFound, userAlreadyLikedFound);
         })
         .catch(function(err) {
           return res.status(500).json({ 'error': 'Impossible de vérifier si l\'utilisateur à déjà liker le post' });
         });
       } else {
         res.status(404).json({ 'error': 'L\'utilisateur n\'existe pas'});
       }
     },
     function(messageFound, userFound, userAlreadyLikedFound, done) {
      if(!userAlreadyLikedFound) {
        userFound.isLike = DISLIKED;
        messageFound.addUser(userFound, { isLike: DISLIKED })
        .then(function (alreadyLikeFound) {
          done(null, messageFound, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'Impossible de mettre un dislike' });
        });
      } else {
        if (userAlreadyLikedFound.isLike === LIKED) {

          models.Like.create({
            userId: userId,
            messageId: messageId,
            isLike  : DISLIKED,
          })
          .then(function() {
            done(null, messageFound, userFound);
          })
          .catch(function(err) {
            res.status(500).json({ 'error': 'Impossible de mettre un dislike' });
          });
        } else {
          res.status(409).json({ 'error': 'Message déjà disliker' });
        }
      }
     },
     function(messageFound, userFound, done) {
       messageFound.update({
         likes: messageFound.likes - 1,
       }).then(function() {
         done(messageFound);
       }).catch(function(err) {
         res.status(500).json({ 'error': 'Impossible de mettre à jour le compteur de like' });
       });
     },
   ], function(messageFound) {
     if (messageFound) {
       return res.status(201).json(messageFound);
     } else {
       return res.status(500).json({ 'error': 'Impossible de mettre à jour le message' });
     }
   });
  }
}