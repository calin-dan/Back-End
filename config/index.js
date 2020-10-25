const db = require("./db");
const { port } = require("../configuration").development;

const config = {
  db,
  port
};

module.exports = config;
