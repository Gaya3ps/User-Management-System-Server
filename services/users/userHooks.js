// server/src/services/users/users.hooks.js

// Ensure GET /users returns only deleted=false by default
const defaultDeletedFalse = async (context) => {
  const q = context.params.query || {};
  // Let clients override by passing ?deleted=true if they ever need it.
  if (q.deleted === undefined) {
    q.deleted = false;
  }
  context.params.query = q;
  return context;
};

// Block hard deletes and hint to use PATCH instead
const preventHardDelete = async (context) => {
  // If someone calls DELETE /users/:id, refuse it and suggest PATCH
  const msg = 'Hard delete is disabled. Use PATCH /users/:id with { "deleted": true } for soft delete.';
  const err = new Error(msg);
  err.code = 400;
  throw err;
};

export const usersHooks = {
  around: {
    // you can add logging, timing, etc. here
  },
  before: {
    find: [defaultDeletedFalse],
    get: [],
    create: [
      // naive required field check (feathers-hooks-common or zod can be used for real validation)
      async (context) => {
        const { data } = context;
        if (!data?.name || !data?.email || !data?.gender) {
          const err = new Error('name, email, gender are required');
          err.code = 400;
          throw err;
        }
        return context;
      }
    ],
    patch: [
      // nothing special needed; PATCH /users/:id with fields works
    ],
    remove: [preventHardDelete] // forbid hard delete
  },
  after: {},
  error: {}
};
