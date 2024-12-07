const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define('User', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING(15),
    },
    Address: {
      type: DataTypes.TEXT,
    },
    RegistrationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    TotalSpent: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      validate: {
        min: 0,
      },
    },
    PermissionType: {
      type: DataTypes.ENUM('Admin', 'User'),
      defaultValue: 'User',
    },
  });

  return User;
};

export default getUserModel;