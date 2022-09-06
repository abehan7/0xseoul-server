import express from "express";

export const authContext = ({ req }: { req: express.Request }) => {
  // if (!req.headers.authorization)
  //   throw new AuthenticationError("empty token");
  if (!req.headers.authorization) return { user: undefined };

  const token = req.headers.authorization.substr(7);
  const user = "this user is authenticated";
  // const user = users.find((user) => user.token === token);
  // if (!user) throw new AuthenticationError('invalid token');
  return { user };
};
