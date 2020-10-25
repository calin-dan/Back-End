module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    departament: DataTypes.STRING
  });
};
