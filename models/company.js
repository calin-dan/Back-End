module.exports = (sequelize, DataTypes) => {
    return sequelize.define("company", {
        name: DataTypes.STRING,
        address: DataTypes.STRING
    });
};
