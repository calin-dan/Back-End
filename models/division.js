module.exports = (sequelize, DataTypes) => {
  return sequelize.define("division", {
    name: DataTypes.STRING
  });
};
