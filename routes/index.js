const express = require("express");
const router = express.Router();
const userInformation = require("../controllers/user");
const otherRouter = require("./other");

router.use("/", otherRouter);
router.post("/users", userInformation.Register);
router.get("/users", userInformation.showUsers);
router.get("/departaments", userInformation.showDepartaments);
router.get("/user:id", userInformation.showUser);
router.get("/stats", userInformation.showStats);
router.delete("/delall", userInformation.deleteUsers);
router.put("/upp/:id", userInformation.updateUser);
module.exports = router;
