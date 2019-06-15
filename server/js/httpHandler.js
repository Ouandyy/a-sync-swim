const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue')

/*
fs.readFile('background.jpg', function(err, data) {
  if (err) {
    console.log(err.stack);
    return
  }
  console.log(data.toString());
})
*/

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
    if (req.url === '/') {
      // let direction = messages.dequeue(messages.messages) 
      res.writeHead(200, headers);
      res.end(JSON.stringify(messages.messages));
      messages.messages = [];
      next()
    } 
  } if (req.method === 'POST') {
    req.on('data', function(chuck){
      messages.enqueue(chuck.toString())
    })
    res.writeHead(200, headers);
    res.end(); // dirrection goes in here maybe function to push directions in messages array.
  } else {     //do background image stuff
    res.writeHead(200, headers);
    res.end();
    next();
    // invoke next() at the end of a request to help with testing!
  }
}
