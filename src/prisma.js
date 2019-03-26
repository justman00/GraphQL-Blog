import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

export { prisma as default };

// prisma.query .mutation .subscription .exists

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({
//     id: authorId
//   });

//   if (!userExists) {
//     throw Error("Author not found");
//   }

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     "{ author { id name email posts { title id published } } }"
//   );

//   return post;
// };

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({
//     id: postId
//   });

//   if (!postExists) {
//     throw Error("Post not found");
//   }

//   const post = await prisma.mutation.updatePost(
//     { data, where: { id: postId } },
//     "{author { id name email posts { title id published } }}"
//   );

//   return post;
// };

// updatePostForUser("cjtovsp2r00je0790cula5pjp", {
//   published: false,
//   title: "somehting new"
// })
//   .then(data => console.log(JSON.stringify(data, undefined, 2)))
//   .catch(e => console.log(e));

// createPostForUser("cjtn0selb00ol0890dc699btx", {
//   title: "Great books to read",
//   body: "The art of war",
//   published: true
// });
