require('dotenv').config();
require('express-async-errors');
const express = require('express');
const authMiddleware = require('./middleware/auth-middleware')

const app = express();

// connectDB
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// ROUTERS
const authRouter = require('./routes/auth.route')
const jobsRouter = require('./routes/jobs.route')

//ROUTES
/**
 * @Params
 * Path
 * use router
 */
app.use('/api/v1/auth', authRouter )
app.use('/api/v1/jobs', authMiddleware, jobsRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
