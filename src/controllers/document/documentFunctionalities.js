const userDb = require('../user/userDbQueries');
const documentDb = require('./documentDbQueries');
const paramValidations = require('./documentParamValidatiion');
const statusCodes = require('../../helpers/statusCodes');
const AWS = require("aws-sdk");

const Logger = require('../../../config/console');
const logger = new Logger().log();

AWS.config.update({
  // eslint-disable-next-line no-undef
  //secretAccessKey: process.env.AWS_ACCESS_SECRET,
  secretAccessKey: 'nbu7aSmG3/eQYdWWeAHXdft+x9iSDbmsst4nsZWC',
  // eslint-disable-next-line no-undef
  //accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessKeyId: 'AKIAZYR6NQDXEG4WXJVL',
  // eslint-disable-next-line no-undef
  //region: process.env.AWS_REGION,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

const handleFileUpload = async (req, res, callback) => {

    if (req.file === undefined || req.file === null) {
        res.send({
            status: '400',
            message: "Please attach a valid file"
          });
    } 
    else {
      const params = req.body.emailId;
      console.log("parmas...",params);
      // const { error } = await paramValidations.validateFileUploadParams(params);
      // if (error) {
      //     res.send({
      //       message: "validation failed",
      //     });          
      // }
    //else{
      const checkUser = await userDb.getUserQueryFromUserId(req.body.emailId);

      if(checkUser){

        if(checkUser.verified === true){
          const { originalname, buffer } = req.file;
   
          let params = {
            // eslint-disable-next-line no-undef
            Bucket: 'aws-s3-fileupload',
            Key: originalname,
            Body: buffer,
          };
          
           s3.upload(params, (err, result) => {
            if (err) {
              
            logger.info(`document upload failed`);
              res.send({
                message: "Failed to upload",
                error: err.message,
              });
            }
            else{

              let params = {
                emailId : req.body.emailId,
                companyDetails : req.body.emailId,
                personalDetails : req.body.emailId,
                url : result.Location
              }

              logger.info(`document uploaded`);
              console.log("user added");
              let newUser = documentDb.insertDocumentDetails(params);
              newUser.save((err) => {
                  if (err) {
                      callback({
                          status: 200,
                          data: {
                              response: statusCodes.failure,
                              message: err
                          }
                      });
                      return
                  }
                  callback({
                      status: 200,
                      data: {
                          response: statusCodes.success,
                          message: "Document saved"
                      }
                  });
              });
              res.send({
                  message: "File Uploaded",
                  result,
                });


              // const findUser = documentDb.getAvailableUser(params.emailId);
              
                
              // console.log("user found...",findUser)
              // if(!findUser){

              //   console.log("user added");
              //   let newUser = documentDb.insertDocumentDetails(params);
              //   newUser.save((err) => {
              //       if (err) {
              //           callback({
              //               status: 200,
              //               data: {
              //                   response: statusCodes.failure,
              //                   message: err
              //               }
              //           });
              //           return
              //       }
              //       callback({
              //           status: 200,
              //           data: {
              //               response: statusCodes.success,
              //               message: "Document saved"
              //           }
              //       });
              //   });
              //   res.send({
              //       message: "File Uploaded",
              //       result,
              //     });
              // }
              // else{
              //   const checkDocument = documentDb.updateDocumentDetails(params);
              //   if (checkDocument) {
              //     console.log("user doc updated",checkDocument);
              //     callback({
              //         status: 200,
              //         data: {
              //             response: statusCodes.success,
              //             message: "document updated..."
              //         }
              //     });
              //     return;
              //   }
              //   else{
              //     console.log("doc failed to update");
              //     res.send({
              //       message: "doc failed to update",
              //       result,
              //     });
              //   }

              // }
            }     
          });
        }
        else{
          res.send({
            status:'200',
            message: "User need to verify your account",
          });
        }

      }
      else{
        res.send({
          status:'200',
          message: "No user found",
        });
      }
    }
};




module.exports = {
  handleFileUpload,
};