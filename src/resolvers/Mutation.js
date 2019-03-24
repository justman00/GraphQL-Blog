import uuid from "uuid";

const Mutation = {
  createUser(parent, { data }, { db }, info) {
    const emailTaken = db.users.some(user => user.email === data.email);

    if (emailTaken) {
      throw new Error("Email taken");
    }

    const user = {
      id: uuid(),
      ...data
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const validUser = db.users.findIndex(user => {
      return user.id === args.id;
    });

    if (validUser === -1) {
      throw new Error("User not found");
    }

    const deletedUser = db.users.splice(validUser, 1);

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
      }

      return !match;
    });

    db.comments = db.comments.filter(comment => comment.author !== args.id);

    return deletedUser[0];
  },
  updateUser(parent, { id, data }, { db }, info) {
    console.log("hi");
    const user = db.users.find(user => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some(user => user.email === data.email);

      if (emailTaken) {
        throw new Error("Email taken");
      }

      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },
  createPost(parent, { data }, { db, pubsub }, info) {
    const validUser = db.users.some(user => user.id === data.author);

    if (!validUser) {
      throw new Error("User not found");
    }

    const post = {
      ...data,
      id: uuid()
    };

    db.posts.push(post);

    if (data.published) {
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: post
        }
      });
    }

    return post;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    // delete the post from the posts array

    const deletedPost = db.posts.find(post => post.id === args.id);
    if (!deletedPost) {
      throw new Error("Post not found");
    }

    db.posts = db.posts.filter(post => post.id !== args.id);
    // delete all the comments that relate to this post
    db.comments = db.comments.filter(com => com.post !== args.id);

    if (deletedPost.published) {
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: deletedPost
        }
      });
    }

    // return the deleted post
    return deletedPost;
  },
  updatePost(parent, { id, data }, { db, pubsub }, info) {
    const post = db.posts.find(post => post.id === id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error("Post not found");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }

    if (typeof data.body === "string") {
      post.body = data.body;
    }

    if (typeof data.published === "boolean") {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        // fire the deleted event
        pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: originalPost
          }
        });
      } else if (!originalPost.published && post.published) {
        // fire the created event
        pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: post
          }
        });
      }
    } else if (post.published) {
      // updated
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: post
        }
      });
    }

    return post;
  },
  createComment(parent, { data }, { db, pubsub }, info) {
    const validUser = db.users.some(user => user.id === data.author);
    const validPost = db.posts.some(
      post => post.id === data.post && post.published
    );

    if (!validUser) {
      throw new Error("User not found");
    }

    if (!validPost) {
      throw new Error("Post not found");
    }

    const comment = {
      ...data,
      id: uuid()
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${data.post}`, {
      comment: {
        mutation: "CREATED",
        data: comment
      }
    });

    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    // delete the comment with the requested id
    const deletedComment = db.comments.find(com => com.id === args.id);
    if (!deletedComment) {
      throw new Error("Comment not found");
    }
    db.comments = db.comments.filter(com => com.id !== args.id);
    // deleted the comment from the post it was written on
    db.posts = db.posts.map(post => {
      if (post.id === deletedComment.post) {
        const newComs = post.comments.filter(com => com !== args.id);
        return { ...post, comments: newComs };
      }
      return post;
    });

    db.users = db.users.map(user => {
      if (user.id === deletedComment.author) {
        const newComs = user.comments.filter(com => com !== args.id);
        return { ...user, comments: newComs };
      }
      return user;
    });

    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment
      }
    });

    // return the deleted post
    return deletedComment;
  },
  updateComment(parent, { id, data }, { db, pubsub }, info) {
    const comment = db.comments.find(cmt => cmt.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (typeof data.text === "string") {
      comment.text = data.text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: "UPDATED",
        data: comment
      }
    });

    return comment;
  }
};

export { Mutation as default };
