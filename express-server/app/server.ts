import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Proxy to Dialogflow server
app.use('/dialogflow', createProxyMiddleware({
    target: 'http://localhost:3000', // The base URL for your dialogflow server
    changeOrigin: true,
    pathRewrite: {
        '^/dialogflow': '/express-dialogflow', // Rewrite the path
    },
}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
