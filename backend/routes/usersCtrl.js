/// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const asyncLib =require('async');

/// Constances
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX=  /^(?=.*\d).{4,12}$/;
/// Routes
module.exports = {
    register: function(req, res,) {
        /// Params
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const bio = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(400).json({'error': 'Erreur, il manque un ou plusieur champ obligatoire'});
        }

        if (username.lenght >= 13 || username.lenght <= 4 ) {
            return res.status(400).json({'error': 'le pseudo doit contenir entre 5 et 12 caractères'});
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({'error': 'email non valide, celui contien des caractères spéciaux interdit'});
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({'error': 'le mot de passe doit contenir entre 4 et 12 caractères puis inclure au moin 1 chiffre'});
        }

        asyncLib.waterfall([
            function(done) {
              models.User.findOne({
                attributes: ['email'],
                where: { email: email }
              })
              .then(function(userFound) {
                done(null, userFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible de trouver l\'utilisateur' });
              });
            },
            function(userFound, done) {
              if (!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                  done(null, userFound, bcryptedPassword);
                });
              } else {
                return res.status(409).json({ 'error': 'l\'utilisateur existe déjà' });
              }
            },
            function(userFound, bcryptedPassword, done) {
              const newUser = models.User.create({
                email: email,
                username: username,
                password: bcryptedPassword,
                bio: bio,
                isAdmin: 0
              })
              .then(function(newUser) {
                done(newUser);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'l\'utilisateur ne peut pas etre crée' });
              });
            }
          ], function(newUser) {
            if (newUser) {
              return res.status(201).json({
                'userId': newUser.id
              });
            } else {
              return res.status(500).json({ 'error': 'Impossible d\'ajouter un nouvelle utilisateur' });
            }
          });
        },
        login: function(req, res) {
          
          // Params
          const email    = req.body.email;
          const password = req.body.password;
      
          if (email == null ||  password == null) {
            return res.status(400).json({ 'error': 'erreur ! il manque des champs obligatoires' });
          }
      
          asyncLib.waterfall([
            function(done) {
              models.User.findOne({
                where: { email: email }
              })
              .then(function(userFound) {
                done(null, userFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible de trouver l\'utilisateur' });
              });
            },
            function(userFound, done) {
              if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                  done(null, userFound, resBycrypt);
                });
              } else {
                return res.status(404).json({ 'error': 'L\'utilisateur n\'existe pas' });
              }
            },
            function(userFound, resBycrypt, done) {
              if(resBycrypt) {
                done(userFound);
              } else {
                return res.status(403).json({ 'error': 'Mot de passe invalide' });
              }
            }
          ], function(userFound) {
            if (userFound) {
              return res.status(201).json({
                'userId': userFound.id,
                'token': jwtUtils.generateTokenForUser(userFound)
              });
            } else {
              return res.status(500).json({ 'error': 'Impossible de se connecter' });
            }
          });
        },

        getUserProfile: function(req, res) {
            // Getting auth header
            const headerAuth  = req.headers['authorization'];
            const userId      = jwtUtils.getUserId(headerAuth);
        
            if (userId < 0)
              return res.status(400).json({ 'error': 'Token de connection invalide' });
        
            models.User.findOne({
              attributes: [ 'id', 'email', 'username', 'bio' ],
              where: { id: userId }
            }).then(function(user) {
              if (user) {
                res.status(201).json(user);
              } else {
                res.status(404).json({ 'error': 'Utilisateur non trouver' });
              }
            }).catch(function(err) {
              res.status(500).json({ 'error': 'Impossible de trouver l\'utilisateur' });
            });
          },
          updateUserProfile: function(req, res) {
            // Getting auth header
            const headerAuth  = req.headers['authorization'];
            const userId      = jwtUtils.getUserId(headerAuth);
        
            // Params
            const bio = req.body.bio;
        
            asyncLib.waterfall([
              function(done) {
                models.User.findOne({
                  attributes: ['id', 'bio'],
                  where: { id: userId }
                }).then(function (userFound) {
                  done(null, userFound);
                })
                .catch(function(err) {
                  return res.status(500).json({ 'error': 'Impossible de trouver l\'utilisateur' });
                });
              },
              function(userFound, done) {
                if(userFound) {
                  userFound.update({
                    bio: (bio ? bio : userFound.bio)
                  }).then(function() {
                    done(userFound);
                  }).catch(function(err) {
                    res.status(500).json({ 'error': 'Impossible de mettre à jour la bio' });
                  });
                } else {
                  res.status(404).json({ 'error': 'Utilisateur non trouver' });
                }
              },
            ], function(userFound) {
              if (userFound) {
                return res.status(201).json(userFound);
              } else {
                return res.status(500).json({ 'error': 'Impossible de mettre à jour le profil' });
              }
            });
        }
    }