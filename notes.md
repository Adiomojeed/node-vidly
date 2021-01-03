No window object in node, all methods and properties are accessed inside global object
variables and functions declared can be accessed in window object but not in global object
Avoid declaring variables in the global scope, instead, create a module so as to avoid overriding
All files are regarded as modules

For file system modules, synchronous functions can be consoled directly but async should be called with a callback
It receives two args, err and return value

Always Capitalize classnames

// Middleware
A middleware is a function that receives a request and returns response back to the client or passes control to 
another middleware function. A route handler function is a middleware. It make authentication, authorization, logging,
etc
app.use() is used to store a middleware function in a request processing pipeline
next() is used in a request callback when we want to reference the next middleware in the pipeline. When not called, a response
is not returned because a control wasn't passed to the next middleware, hence causing a hang of response

Middleware functions are called as they are declared