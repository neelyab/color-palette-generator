const express = require("express");
const app = express();
const cors = require('cors');

// const authRouter = require('./auth/oauth');
// const requestRouter = require('./auth/request');
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const colorPaletteRouter = require("./colorPalette/colorPalette.router");
const threadColorRouter = require("./threadColors/threadColors.router");
const { auth } = require("google-auth-library");

app.use(express.json());
app.use(cors());

// app.use("/oauth", authRouter);
// app.use("/request", requestRouter);
app.use("/users", usersRouter);
app.use("/auth/login", authRouter);
app.use("/color-palette", colorPaletteRouter);
app.use("/thread-colors", threadColorRouter);


// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
