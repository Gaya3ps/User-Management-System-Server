export async function up(knex) {
  const exists = await knex.schema.hasTable("users");
  if (!exists) {
    await knex.schema.createTable("users", (t) => {
      t.increments("id").primary();
      t.string("name").notNullable();
      t.string("email").notNullable().unique();
      t.enu("gender", ["Male", "Female"], {
        useNative: true,
        enumName: "gender_enum",
      }).notNullable();
      t.boolean("deleted").notNullable().defaultTo(false);
      t.timestamps(true, true);
    });
  }
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
  try {
    await knex.raw("DROP TYPE IF EXISTS gender_enum;");
  } catch {}
}
