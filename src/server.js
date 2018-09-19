const http = require('http'); // pull the http server
const url = require('url'); // pull the url
const query = require('querystring');

// from file
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;


const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/favicon.ico': htmlHandler.getFavicon,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  console.dir(`URL extension: ${parsedUrl.query}`);
  console.dir(`Params: ${params.valid}`);

  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname] === '/') {
    urlStruct[parsedUrl.pathname](request, response);
  } else if (urlStruct[parsedUrl.pathname] === '/style.css') {
    urlStruct[parsedUrl.pathname](request, response);
  } else if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

// console.log(`Listening on 127.0.0.1: ${port}`);
