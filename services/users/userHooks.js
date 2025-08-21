const defaultDeletedFalse = async (context) => {
  const q = context.params.query || {};
  if (q.deleted === undefined) {
    q.deleted = false;
  }
  context.params.query = q;
  return context;
};

const preventHardDelete = async (context) => {
  const msg =
    'Hard delete is disabled. Use PATCH /users/:id with { "deleted": true } for soft delete.';
  const err = new Error(msg);
  err.code = 400;
  throw err;
};

export const usersHooks = {
  around: {},
  before: {
    find: [defaultDeletedFalse],
    get: [],
    create: [
      async (context) => {
        const { data } = context;
        if (!data?.name || !data?.email || !data?.gender) {
          const err = new Error("name, email, gender are required");
          err.code = 400;
          throw err;
        }
        return context;
      },
    ],
    patch: [],
    remove: [preventHardDelete],
  },
  after: {},
  error: {},
};
