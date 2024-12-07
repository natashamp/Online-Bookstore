const getOrderDetailModel = (sequelize, { DataTypes }) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    OrderDetailID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders', // Name of the referenced table
        key: 'OrderID',  // Key in the referenced table
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
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Ensure positive quantity
      },
    },
    Subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0, // Ensure non-negative subtotal
      },
    },
    Discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
  });

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: 'OrderID',
      onDelete: 'CASCADE',
    });
    OrderDetail.belongsTo(models.Book, {
      foreignKey: 'BookID',
      onDelete: 'CASCADE',
    });
  };

  return OrderDetail;
};

export default getOrderDetailModel;