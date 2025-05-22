const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StockIn = sequelize.define('StockIn', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StockInQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StockInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    SparePartName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Stock_In',
  });

  StockIn.associate = (models) => {
    StockIn.belongsTo(models.SparePart, { foreignKey: 'SparePartName' });
  };

  return StockIn;
};