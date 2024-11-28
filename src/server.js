
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react'],
});

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./App');

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    const appHtml = ReactDOMServer.renderToString(React.createElement(App));
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>SSR Example</title></head>
            <body>
                <div id="root">${appHtml}</div>
            </body>
        </html>
    `);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
