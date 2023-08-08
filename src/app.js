const express = require("express");
const app = express();
const cors = require('cors');

const colorsRouter = require("./colors/colors.router");

app.use(express.json());
app.use(cors());
app.use("/colors", colorsRouter);


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
