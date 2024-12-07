const getNotificationModel = (sequelize, { DataTypes }) => {
  const Notification = sequelize.define('Notification', {
    NotificationID: {
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
    Message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    NotificationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    NotificationType: {
      type: DataTypes.ENUM('OrderUpdate', 'Promotions', 'SystemAlert'),
      defaultValue: 'SystemAlert',
    },
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: 'UserID',
      onDelete: 'CASCADE',
    });
  };

  return Notification;
};

export default getNotificationModel;