const { db } = require("../config");
const User = db.import("./user");
const Divizion = db.import("./division");
const Department = db.import("./department");
const Company = db.import("./company");

User.belongsTo(Department, {
  onDelete: "Cascade"
});
User.belongsTo(Divizion, {
  onDelete: "Cascade"
});

Divizion.belongsTo(Department, {
  onDelete: "Cascade"
});
Department.belongsTo(Company, {
  onDelete: "Cascade"
})

module.exports = {
  db,
  User,
  Divizion,
  Department,
  Company
};
