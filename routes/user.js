const express = require("express");
const router = express.Router();
const UserDB = require("../models/user");
const userInformation = require("../controllers/user");

router.post("/users", userInformation.Register);
router.get("/users", userInformation.showUsers);
router.get("/departaments", userInformation.showDepartaments);
router.get("/user:id", userInformation.showUser);
router.get("/delall", userInformation.deleteUsers);
