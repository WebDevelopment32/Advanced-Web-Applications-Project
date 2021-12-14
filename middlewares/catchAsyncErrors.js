// Sending a message when a given request is missing a parameter required by a schema
// This means that the request doesn't get stuck but the error message is sent to the request and not
//* only shown in console
module.exports = func => (req, res, next) =>
    // Passing to resolve the function it self (!conroller function!)
    // next is used to tell the express.js to move on after the funciton is done in the middleware
    Promise.resolve(func(req, res, next)).catch(next);