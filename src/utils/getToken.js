import jwt from "jsonwebtoken";

const getToken = userId => {
  return jwt.sign({ userId }, "thisisasecret", {
    expiresIn: "7 days"
  });
};

export { getToken as default };
