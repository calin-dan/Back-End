const express = require("express");
const router = express.Router();
const { other } = require("../controllers");

router.get("/reset", other.reset);
router.get("/add", other.create);

module.exports = router;
