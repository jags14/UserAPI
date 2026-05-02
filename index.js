const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const userRoutes = require('./src/module/user/user.routes');
const authRoutes = require('./src/module/auth/auth.routes');
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/middlewares/logsHandler');
const requestId = require('./src/middlewares/requestId');
const app = express();
const limiter = require('./src/middlewares/rateLimiter');
const authLimiter = require('./src/middlewares/authLimiter');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

require('./src/db/db');
require('dotenv').config();
const port = process.env.PORT || 3000;

// middlewares and user routes
app.use(express.json());
app.use(requestId);
app.use(logger);
app.use(limiter.limiter);
app.use(helmet());
app.use(hpp());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});
// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Listening on port: ${port}`);
});

module.exports = app;