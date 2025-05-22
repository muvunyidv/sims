const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StockOut = sequelize.define('StockOut', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StockOutQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StockOutUnitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('StockOutUnitPrice');
        return value === null ? null : parseFloat(value);
      },
    },
    StockOutTotalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('StockOutTotalPrice');
        return value === null ? null : parseFloat(value);
      },
    },
    StockOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    SparePartName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Stock_Out',
  });

  StockOut.associate = (models) => {
    StockOut.belongsTo(models.SparePart, { foreignKey: 'SparePartName' });
  };

  return StockOut;
};