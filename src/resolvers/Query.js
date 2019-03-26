const Query = {
  users(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      };
    }

    return prisma.query.users(opArgs, info);

    // if (args.query) {
    //   return db.users.filter(user =>
    //     user.name.toLowerCase().includes(args.query.toLowerCase())
    //   );
    // }
    // return db.users;
  },
  posts(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ]
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        text_contains: args.query
      };
    }

    return prisma.query.comments(opArgs, info);
  }
};

export { Query as default };
