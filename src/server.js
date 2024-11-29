require('@babel/register')({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
});

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const { store } = require('./store/store');
const App = require('./App').default;
const { Provider } = require('react-redux');

const app = express();

app.use(express.static('dist')); // Servir archivos estáticos desde la carpeta dist

app.get('*', (req, res) => {
    const context = {};

    const html = ReactDOMServer.renderToString(
        React.createElement(StaticRouter, { location: req.url, context },
            React.createElement(Provider, { store },
                React.createElement(App)
            )
        )
    );

    if (context.url) {
        res.redirect(301, context.url);
    } else {
        res.send(`<!doctype html><html><head><title>My App</title></head><body><div id="root">${html}</div><script>
            window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}
        </script><script src="/bundle.js"></script></body></html>`);
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
