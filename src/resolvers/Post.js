const Post = {
  author(parent, args, { db }, info) {
    return db.users.find(user => user.id === parent.author);
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter(cmt => cmt.post === parent.id);
  }
};

export { Post as default };
