const getVendorOrderModel = (sequelize, { DataTypes }) => {
  const VendorOrder = sequelize.define('VendorOrder', {
    VendorOrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    VendorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Vendors', // Name of the referenced table
        key: 'VendorID',  // Key in the referenced table
      },
      onDelete: 'CASCADE',
    },
    BookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books', // Name of the referenced table
        key: 'BookID',  // Key in the referenced table
      },
      onDelete: 'CASCADE',
    },
    OrderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Ensure positive quantity
      },
    },
    TotalCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0, // Ensure non-negative total cost
      },
    },
    DeliveryDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    OrderStatus: {
      type: DataTypes.ENUM('Pending', 'Received', 'Canceled'),
      defaultValue: 'Pending',
    },
  });

  VendorOrder.associate = (models) => {
    VendorOrder.belongsTo(models.Vendor, {
      foreignKey: 'VendorID',
      onDelete: 'CASCADE',
    });
    VendorOrder.belongsTo(models.Book, {
      foreignKey: 'BookID',
      onDelete: 'CASCADE',
    });
  };

  return VendorOrder;
};

export default getVendorOrderModel;