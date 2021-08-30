/// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
/// Routes
module.exports = {
    register: function(req, res,) {
        /// Params
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const bio = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }
        //taille de pseudo, mail valide ect ...
        models.User.findOne({
            attribute: ['email'],
            where: {email: email}
        })
        .then(function(userFound){
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword ) {
                    const newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })           
        .catch(function(err) {
            return res.status(500).json({'error': 'unable to verify user'});
        });
    });
 } 
 
 else {
    return res.status(409).json({'error': 'pseudo est déjà pris'});
    }
    })
},
    login: function(req, res,) {
    // Params
    const email    = req.body.email;
    const password = req.body.password;

    if (email == null ||  password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }
    models.User.findOne({
        where: { email: email }
      })
    .then(function(userFound) {
        if (userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                if(resBycrypt) {
            return res.status(200).json({
                'userId': userFound.id,
                'token': jwtUtils.generateTokenForUser(userFound)
            });
        } else {
            return res.status(403).json({'error': 'mot de passe invalid'});
        }    
    });

        } else {
        return res.status(400).json({'error': 'utilisateur non trouvé'});
        }
    })
    .catch(function(err) {
        return res.status(500).json({'error': 'unable to verify user'});
    });  
    }
}