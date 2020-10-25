const UserDB = require("../models/index").User;
const DepartamentDB = require("../models/index").Department
const Department = require("../models/index").Department;
const Divizion = require("../models/index").Divizion;
const Function = require("../models/index").Function;
const express = require("express");
const router = express.Router();
// GET/api/users
const showUsers = async (req, res) => {
  const users = await UserDB.findAll({
    attributes: ["id", "firstName", "lastName", "phone", "email"]
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({
        message: "Database error"
      });
    });
};
//GET/api/user
const showUser = async (req, res) => {
  let user = await UserDB.findByPk(req.params.id, {
    attributes: ["lastName", "firstName", "phone", "email"]
  })
    .then(user => {
      res.status(200).send(user);
    }).catch(() => {
      res.status(500).send({
        message: "database error"
      })
    });
};


//GET/api/departaments
const showDepartaments = async (req, res) => {
  const departaments = await DepartamentDB.findAll({
    attributes: ["name", "shortName"]
  })
    .then(departaments => {
      res.status(200).send(departaments);
    })
    .catch(() => {
      res.status(500).send({
        message: "Database error"
      });
    });
};


// Post/api/users
const Register = async (req, res) => {
  const errors = [];

  const user = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    phone: req.body.phone,
    departament: req.body.departament
  };
  if (
    !user.lastName.match(
      "([A-ZAÎ??Â])+(?=.{1,40}$)[a-zA-ZAÎ??Âaî??]+(?:[-\\s][a-zA-ZAÎ??Âaî??â]+)*$"
    )
  ) {
    errors.push("Invalid Last Name");
  } else if (
    !user.firstName.match(
      "([A-ZAÎ??Â])+(?=.{1,40}$)[a-zA-ZAÎ??Âaî??]+(?:[-\\s][a-zA-ZAÎ??Âaî??â]+)*$"
    )
  ) {
    errors.push("Invalid First Name");
  } else if (
    !user.email.match(
      "(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
    )
  ) {
    errors.push("Invalid Mail");
  }
  console.log(errors);
  const existentMail = await UserDB.findOne({
    where: {
      email: req.body.email
    }
  });

  if (existentMail) {
    errors.push("Email already registered");
    res.status(501).send({
      message: "Email already registered"

    });
  }
  else if (
    !user.phone.match(
      /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/
    )
  ) {
    errors.push("Invalid phone number");
  }
  if (errors.length === 0) {
    try {
      await UserDB.create(user);
      res.status(201).send({
        message: "Succesfully registered"
      });
    } catch (error) {
      res.status(500).send({
        message: "Error registering user"
      });
    }
  } else {
    res.status(400).send({
      errors
    });
  }
};


//GET/api/stats
const showStats = async (req, res) => {

  const users = await UserDB.findAll({
  })
    .then(async users => {
      const allUsers = new Array();
      for (i = 0; i < users.length; i++) {
        let department = undefined;
        let division = undefined;

        const departmentObj = await Department.findOne({
          where: { id: users[i].dataValues.departmentId },
          attributes: ['name']
        })
          .then(async departmentObj => {
            department = departmentObj.name;
            const divisionObj = await Divizion.findOne({
              where: { id: users[i].dataValues.divisionId },
              attributes: ['name']
            })

          }).catch(() => {
            res.status(500).send({
              message: "Error on /users route when trying to access the database"
            })
          })
        allUsers.push({
          ...users[i].dataValues,
          departmentId: undefined,
          divisionId: undefined,
          department,
          division

        });
      }
      res.status(200).send({ allUsers })
    })
};

//delete all users
const deleteUsers = async (req, res) => {
  const users = await UserDB.destroy({
    where: {},
    truncate: {
      cascade: true
    }
  })
    .then(() => {
      res.status(200).send({
        message: "Users deleted"
      });
    })
    .catch(() => {
      res.status(500).send({
        message: "Database erros muie"
      });
    });
};

// delete one user
const updateUser = async (req, res) => {
  try {
    const user = await UserDB.findOne({
      where: {
        id: req.params.id
      }
    })
    if (user) {

      if (!user.phone) {
        res.status(400).send({
          message: "Nu ai introdus nr de tel nou"
        })
      } else if (!user.phone.match(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/)) {
        res.status(400).send({
          message: "Nr tel invalid"
        })
      } else {
        user.update({
          password: req.body.phone
        })
          .then(() => {
            res.status(200).send({
              message: "Ok, utilizator updatat"
            })
          })
      }
    }

  } catch {
    res.status(500).send({
      message: 'Server crapat'
    })
  }
}

module.exports = { showUsers, Register, showDepartaments, showUser, showStats, deleteUsers, updateUser };




