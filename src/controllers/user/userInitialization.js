const addUser = require('./user');
const Logger = require('../../../config/console');
const logger = new Logger().log();

const userRegister = async(req,res,next) => {
    if(typeof req.body === 'undefined'){
       logger.info(`undefined req`);
        res.json({
            result : '0',
            message : 'no request content'
        });
    }
    else{
        logger.info(`valid data`);
        await addUser.insertUserDetails(req.body,(result)=>{
            if(result.status === 400){
                res.statusCode = result.status,
                res.send(result.data.message);
                return;
            }
            res.json(result.data);
        });
    }
}

const verifyUser = async (req, res, next) => {
    if (typeof req.body === 'undefined') {
      res.json({ result: '0', message: 'no request content' });
    } else {
        await addUser.verify(req.body, (result) => {
        console.log('result', result.status);
        if (result.status === 400) {
          res.statusCode = result.status;
          res.send(result.data.message);
          return;
        }
        res.json(result.data);
      });
    }
}

const loginUser =  async (req, res, next) => {
    if (typeof req.body === 'undefined') {
      res.json({ result: '0', message: 'no request content' });
    } else {
       await addUser.login(req.body, (result) => {
        console.log('result', result.status);
        if (result.status === 400) {
          res.statusCode = result.status;
          res.send(result.data.message);
          return;
        }
        res.json(result.data);
      });
    }
  }

module.exports = {
    userRegister,
    verifyUser,
    loginUser
}