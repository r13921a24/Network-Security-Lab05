import express from "express";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { apiRouter } from "./routes";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8000;
const { SESSION_SECRET } = process.env;

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable not set!");
}

const app = express();

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json());
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: null,
    },
    // use random secret
    secret: SESSION_SECRET,
    name: "sessionId", // don't omit this option
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/v1", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
