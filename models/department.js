module.exports = (sequelize, DataTypes) => {
  return sequelize.define("department", {
    name: DataTypes.STRING,
    shortName: DataTypes.STRING,
    icon: DataTypes.STRING
  });
};
