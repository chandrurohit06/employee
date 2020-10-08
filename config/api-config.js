const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
const dbfunc = require("./db-function");
const empRouter = require("../Router/router");
app.use(cors());

app.use(express.json());
dbfunc.connectionCheck
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", router);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const ApiConfig = {
  app: app,
};

empRouter.init(router);

module.exports = ApiConfig;
