const AWS = require('aws-sdk');
const {
  asyncCreateQueue,
} = require('./awsFunctions.js');

module.exports = async function deploySQS(resourceName) {
   try {
     const createQueueParams = {
       QueueName: `${resourceName}Queue`,
     };

     await asyncCreateQueue(createQueueParams);

   } catch (err) {
     console.log(err);
   }
}
