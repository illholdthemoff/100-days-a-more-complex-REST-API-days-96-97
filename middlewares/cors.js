const res = require("express/lib/response");

function enableCors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // adds a header to the response, 2 parameters required: the header and the value. We need thius because the browser throws a CORS error when our other file tries to access our server (since there are different ports involved, and this would act this way by default if we were using different hosting online as well) This protects the API backend from being able to be used by just anyone. This gates access. the * means that any can access.
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  ); // options is automatically sent by the browser when ajax requests are involved to see if what is being requested is allowed by the server
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // this by default allows a couple headers, but we also specify Content-Type, which is used in a few places for our POST/PATCH method responses in the other file.

  next(); //goes to the next middleware
}

module.exports = enableCors;
