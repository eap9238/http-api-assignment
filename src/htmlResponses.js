const fs = require('fs'); // call files

const index = fs.readFileSync(`${__dirname}/../client/client.html`); // access client
const css = fs.readFileSync(`${__dirname}/../client/style.css`); // access css


const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};

const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
};

const getFavicon = (request, response) => {
    response.end();
};

module.exports = {
    getIndex,
    getCSS,
    getFavicon,
};
