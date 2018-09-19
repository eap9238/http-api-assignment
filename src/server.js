const http = require('http'); // pull the http server
const url = require('url'); // pull the url
const query = require('querystring');

// from file
const responseHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;


const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/favicon.ico': htmlHandler.getFavicon,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);

    const acceptedTypes = request.headers.accept.split(',');

    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
    } else {
        urlStruct.notFound(request, response, acceptedTypes, params);
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
