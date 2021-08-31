const models   = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

// Constants
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  createMessage: function(req, res) {
    // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);
    // Params
    const title   = req.body.title;
    const content = req.body.content;

    if (title == null || content == null) {
      return res.status(400).json({ 'error': 'paramètres manquants' });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
      return res.status(400).json({ 'error': 'paramètres invalide' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'Impossible de vérifier l\'utilisateur' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          models.Message.create({
            title  : title,
            content: content,
            likes  : 0,
            UserId : userFound.id
          })
          .then(function(newMessage) {
            done(newMessage);
          });
        } else {
          res.status(404).json({ 'error': 'Utilisateur non trouvé' });
        }
      },
    ], function(newMessage) {
      if (newMessage) {
        return res.status(201).json(newMessage);
      } else {
        return res.status(500).json({ 'error': 'Impossible de poster un message' });
      }
    });
  },
  listMessages: function(req, res) {
    const fields  = req.query.fields;
    const limit   = parseInt(req.query.limit);
    const offset  = parseInt(req.query.offset);
    const order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: [ 'username' ]
      }]
    }).then(function(messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ "error": "Aucun message trouver" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "Champ invalide" });
    });
  }
}