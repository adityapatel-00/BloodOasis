const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

require("dotenv").config();
require("./helpers/init_mongodb");
// const { verifyAccessToken } = require("./helpers/jwt_helper");
const authRoute = require("./routes/auth.route");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res, next) => {
  res.send("Hello from express");
});

app.use("/auth", authRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound("This route doesn't exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
