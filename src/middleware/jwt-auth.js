const AuthService = require("../auth/auth-service");
const knexInstance = require("../db/connection");

function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || '';
    let bearerToken;
    // check to see if bearer token is present
    if(!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({error: 'Missing bearer token'});
    } else {
        bearerToken = authToken.slice(7, authToken.length);
    }
    try {
        console.log('got hereee')
        // verify token and get user with username from database
        const payload = AuthService.verifyJwt(bearerToken);
        console.log(`payload ${payload}`);
        AuthService.getUserWithUserName(
            knexInstance,
            payload.sub
        )
        .then(user =>{
            console.log(user);
            // if user doesn't exist, send status 401
            if(!user)
            return res.status(401).json({error: 'Unauthorized request'})
        req.user = user
        next()
        })
      }
      catch(error){
          res.status(401).json({error: 'Unauthorized request'});
      }
    }
module.exports = requireAuth