import "dotenv/config";
import cors from "cors";
import nodeExpress from "express";
import { feathers } from "@feathersjs/feathers";
import fe from "@feathersjs/express";

import { db } from "./knex.js";
import { registerUsersService } from "./services/users/userService.js";
const feathersExpress = fe?.default ?? fe;
const rest = fe?.rest ?? feathersExpress.rest;
const errorHandler = fe?.errorHandler ?? feathersExpress.errorHandler;
const PORT = process.env.PORT;

const app = feathersExpress(feathers());

app.set("postgresClient", db);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(nodeExpress.json());

app.use(nodeExpress.urlencoded({ extended: true }));

app.configure(rest());

registerUsersService(app);

app.get("/", (_, res) => res.json({ ok: true }));

app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Feathers API running at http://localhost:${PORT}`);
});
