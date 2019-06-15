module.exports.messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  this.messages.push(message);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  console.log(`Dequeing message: ${this.messages[0]}`);
  return this.messages.shift();
};