// server/src/index.js
import 'dotenv/config';
import cors from 'cors';
import nodeExpress from 'express'; 
import { feathers } from '@feathersjs/feathers';
import fe from '@feathersjs/express';

import { db } from './knex.js';
import { registerUsersService } from './services/users/userService.js';
const feathersExpress = fe?.default ?? fe;
const rest = fe?.rest ?? feathersExpress.rest;     // rest() configurator
const errorHandler = fe?.errorHandler ?? feathersExpress.errorHandler;
// Fail fast if PORT not set
const PORT = process.env.PORT;


// Build Feathers + Express app
const app = feathersExpress(feathers());

// Attach knex client so services can access it
app.set('postgresClient', db);

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);
app.use(nodeExpress.json());

app.use(nodeExpress.urlencoded({ extended: true }));


// Enable REST transport
app.configure(rest());

// Register services
registerUsersService(app);

// Health-check
app.get('/', (_, res) => res.json({ ok: true }));

// Error handler
app.use(errorHandler());

// Start server
app.listen(PORT, () => {
  console.log(`Feathers API running at http://localhost:${PORT}`);
});
