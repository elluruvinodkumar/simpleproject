const jwt = require('jsonwebtoken');
const config = require('../helpers/config.json');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,config.secretkey,(err,user)=>{
            if(err) res.status(403).json("Token is not valid!");
            req.emailId = user;
            next();
        })
    }
    else{
        return res.status(401).json("You are not authenticated!");
    }
}

module.exports = {
    verifyToken
}



// var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var config = require('../helpers/config.json'); // get our config file

// function verifyToken(req, res, next) {

//   // check header or url parameters or post parameters for token
//   var token = req.headers['token'];
//   if (!token) 
//     return res.status(403).send({ auth: false, message: 'No token provided.' });

//   // verifies secret and checks exp
//   jwt.verify(token, config.secretkey, function(err, decoded) {      
//     if (err) 
//       return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});    

//     // if everything is good, save to request for use in other routes
//     req.body.emailId = decoded.id;
//     console.log(req.userId);
//     next();
//   });
// }
// module.exports = verifyToken;