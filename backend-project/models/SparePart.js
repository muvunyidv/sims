const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SparePart = sequelize.define('SparePart', {
    Name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('UnitPrice');
        return value === null ? null : parseFloat(value);
      },
    },
    TotalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('TotalPrice');
        return value === null ? null : parseFloat(value);
      },
    },
  }, {
    timestamps: false,
    tableName: 'Spare_Parts',
  });

  SparePart.associate = (models) => {
    SparePart.hasMany(models.StockIn, { foreignKey: 'SparePartName' });
    SparePart.hasMany(models.StockOut, { foreignKey: 'SparePartName' });
  };

  return SparePart;
};