const users = [
  {
    id: "1",
    name: "Vlad",
    email: "vlad@vlad.com",
    age: 18,
    comments: ["9", "10"]
  },
  {
    id: "2",
    name: "John",
    email: "john@john.com",
    age: 17,
    comments: []
  },
  {
    id: "3",
    name: "Colt",
    email: "Colt@Colt.com",
    comments: ["11", "12"]
  }
];

const posts = [
  {
    id: "4",
    title: "Test 1",
    body: "Test 1 body",
    published: false,
    author: "1",
    comments: ["11", "12"]
  },
  {
    id: "5",
    title: "Test 2",
    body: "Test 1 body",
    published: true,
    author: "1",
    comments: []
  },
  {
    id: "6",
    title: "Test 3",
    body: "Test 1 body",
    published: true,
    author: "2",
    comments: ["9", "10"]
  }
];

const comments = [
  {
    text: "Comment 1",
    id: "9",
    author: "1",
    post: "6"
  },
  {
    text: "Comment 2",
    id: "10",
    author: "1",
    post: "6"
  },
  {
    text: "Comment 3",
    id: "11",
    author: "3",
    post: "4"
  },
  {
    text: "Comment 4",
    id: "12",
    author: "3",
    post: "4"
  }
];

const db = {
  users,
  posts,
  comments
};

export { db as default };
