const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes");
const { port } = require("./config");

const configure = app => {
  app.use(cors());
  app.use(bodyParser.json());

  app.use("/api", router);
};

const app = express();

configure(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
