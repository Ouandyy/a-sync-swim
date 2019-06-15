const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue')


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if (req.method === '/') { //<---------
      console.log('headers',headers)
      let direction = messages.dequeue(messages.messages)
      // console.log()
      res.writeHead(200, headers);
      res.end(direction);
      next()
      } else {
        res.end()
        next()
      }
    }
    // if (req.dataType === 'text') {
    //ASK HOW TO DIFFERENTIATE BETWEEN GET REQUESTS <----------------------------------------------------------------
      
    // }
  res.writeHead(200, headers);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
}
