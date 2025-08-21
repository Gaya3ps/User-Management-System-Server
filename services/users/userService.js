import knexPkg from "@feathersjs/knex";
const { KnexService } = knexPkg;
import { usersHooks } from "../users/userHooks.js";

export const registerUsersService = (app) => {
  const options = {
    Model: app.get("postgresClient"),
    name: "users",
    paginate: false,
  };

  app.use("users", new KnexService(options));

  const service = app.service("users");
  service.hooks(usersHooks);
};
