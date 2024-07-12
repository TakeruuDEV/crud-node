const express = require('express');
const bodyParserMiddleware = require('./middlewares/bodyParser');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const port = 3000;

// Middleware
bodyParserMiddleware(app);

// Routes
app.use('/', gameRoutes);

// Start server
app.listen(port);