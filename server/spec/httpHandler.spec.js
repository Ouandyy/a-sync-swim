
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
//server.mock takes 3 peram url, method, postdata
//server will output new request and new response
const server = require('./mockServer');
// queue has two methods
// enqueue - message as argument, message is push to array, then console.log
// dequeue - return message and shift from message array.
const queue = require('../js/messageQueue');
//has 3 methods
//backgroundImageFile - path for background image
//initialize - queue as arg, messageQueue = queue
//router - (req, resp, callback)
const httpHandler = require('../js/httpHandler');



describe('server responses', () => {

  it('should respond to a OPTIONS request', (done) => {
    let {req, res} = server.mock('/', 'OPTIONS');

    httpHandler.router(req, res);
    expect(res._responseCode).to.equal(200);
    expect(res._ended).to.equal(true);
    expect(res._data.toString()).to.be.empty;

    done();
  });

  it('should respond to a GET request for a swim command', (done) => {
    // write your test here
    let {req, res} = server.mock('/', 'GET');
    let directions = ['up', 'down', 'left', 'right'];
    let randDirection = directions[Math.floor(Math.random() * directions.length)];
    queue.enqueue(randDirection)
    httpHandler.router(req, res, () => {
      expect(res._responseCode).to.equal(200);
      expect(res._ended).to.equal(true);
      done();
    });

  });

  xit('should respond with 404 to a GET request for a missing background image', (done) => {
    httpHandler.backgroundImageFile = path.join('.', 'spec', 'missing.jpg');
    let {req, res} = server.mock('/', 'GET');

    httpHandler.router(req, res, () => {
      expect(res._responseCode).to.equal(404);
      expect(res._ended).to.equal(true);
      done();
    });
  });

  xit('should respond with 200 to a GET request for a present background image', (done) => {
    // write your test here
    done();
  });

  var postTestFile = path.join('.', 'spec', 'water-lg.jpg');

  xit('should respond to a POST request to save a background image', (done) => {
    fs.readFile(postTestFile, (err, fileData) => {
      httpHandler.backgroundImageFile = path.join('.', 'spec', 'temp.jpg');
      let {req, res} = server.mock('/', 'POST', fileData);

      httpHandler.router(req, res, () => {
        expect(res._responseCode).to.equal(201);
        expect(res._ended).to.equal(true);
        done();
      });
    });
  });

  xit('should send back the previously saved image', (done) => {
    fs.readFile(postTestFile, (err, fileData) => {
      httpHandler.backgroundImageFile = path.join('.', 'spec', 'temp.jpg');
      let post = server.mock('/', 'POST', fileData);

      httpHandler.router(post.req, post.res, () => {
        let get = server.mock('/', 'GET');
        httpHandler.router(get.req, get.res, () => {
          expect(Buffer.compare(fileData, get.res._data)).to.equal(0);
          done();
        });
      });
    });
  });
});
