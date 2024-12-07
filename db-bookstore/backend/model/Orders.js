const getOrderModel = (sequelize, { DataTypes }) => {
  const Order = sequelize.define('Order', {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the referenced table
        key: 'UserID',  // Key in the referenced table
      },
      onDelete: 'CASCADE',
    },
    OrderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    TotalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered', 'Canceled'),
      defaultValue: 'Pending',
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'UserID',
      onDelete: 'CASCADE',
    });
  };

  return Order;
};

export default getOrderModel;