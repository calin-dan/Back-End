const { db, Department, Divizion } = require("../models");

const controller = {
  reset: async (req, res) => {
    try {
      await db.sync({
        force: true
      });
      await create();
      res.status(201).send({
        message: "Database erorr"
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Database reset"
      });
    }
  },

  create: async () => {

    await Department.create({
      name: "Information and Technology Department",
      shortName: "IT"
    });
    await Department.create({
      name: "Educational Department",
      shortName: "EDU"
    });
    await Department.create({
      name: "Human Resources Department",
      shortName: "HR"
    });
    await Department.create({
      name: "Fundraising Department",
      shortName: "FR"
    });
    await Department.create({
      name: "Imagine&Promovare Department",
      shortName: "I&P"
    });
    await Divizion.create({
      name: "Front-End",
      departmentId: 1
    });

    await Divizion.create({
      name: "Back-End",
      departmentId: 1
    });

    await Divizion.create({
      name: "Video",
      departmentId: 5
    });
    await Divizion.create({
      name: "Grafica",
      departmentId: 5
    });
    await Divizion.create({
      name: "PR",
      departmentId: 5
    });
    await Divizion.create({
      name: "NONE",
      departmentId: 2
    });

  }
};




module.exports = controller;
