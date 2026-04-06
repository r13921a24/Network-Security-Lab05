import { User } from "../models/index.js";
import bcrypt from "bcryptjs";

// check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ message: "未經授權，請先登入 (Unauthorized)" });
};

/** @param {import('express').Router} r */
export const setupUserController = (r) => {
  // user registration
  r.post("/signup", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).json({ id: newUser.id, username: newUser.username });
    } catch (error) {
      next(error);
    }
  });

  // user login
  r.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.userId = user.id; // 設置 Session
        return res.status(200).json({ message: "登入成功" });
      }
      res.status(401).json({ message: "帳號或密碼錯誤" });
    } catch (error) {
      next(error);
    }
  });

  // user logout
  r.post("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("sessionId");
    res.status(204).send();
  });

  // get current user info (protected route)
  r.get("/me", isAuthenticated, async (req, res) => {
    const user = await User.findByPk(req.session.userId);
    res.status(200).json(user);
  });

  // get all users (protected route)
  r.get("/users", isAuthenticated, function getAll(req, res, next) {
    User.findAll({ order: ["id"] })
      .then((instance) => res.status(200).send(instance))
      .catch(next);
  });

  // edit user info (protected route)
  r.patch("/users/:id", isAuthenticated, function patch(req, res, next) {
    const { username } = req.body;
    // 額外權限檢查：只能修改自己的資料
    if (req.session.userId !== parseInt(req.params.id)) {
        return res.status(403).json({ message: "權限不足" });
    }
    if (typeof username === "string") {
      User.update({ username }, { where: { id: req.params.id } })
        .then(() => res.status(204).send())
        .catch(next);
    } else {
      next();
    }
  });

  r.get("/csrf", function setCsrfCookie(req, res) {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(204).send();
  });
};

/**
 * @typedef {import('@types/express-serve-static-core').RequestHandler<
 *   import('@types/express-serve-static-core').RouteParameters<
 *     "users/:id"
 *   >, any, any, ParsedQs, Record<string, any>
 * >} userHandler
 */
