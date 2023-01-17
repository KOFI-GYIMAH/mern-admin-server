import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import {
  clientRoutes,
  generalRoutes,
  managementRoutes,
  salesRoutes,
} from './routes/index.js';

// * Configurations
const app = express();
app.use(express.json());

dotenv.config();
app.use(cors);
app.use(morgan('common'));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// * Routes
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

// * Mongoose Config
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
  })
  .catch((err) => console.log(err));
