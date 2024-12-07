const getUserAccountModel = (sequelize, { DataTypes }) => {
  const UserAccount = sequelize.define('UserAccount', {
    AccountID: {
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
    Username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AccountStatus: {
      type: DataTypes.ENUM('Active', 'Suspended'),
      defaultValue: 'Active',
    },
    LastLogin: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });

  UserAccount.associate = (models) => {
    UserAccount.belongsTo(models.User, {
      foreignKey: 'UserID',
      onDelete: 'CASCADE',
    });
  };

  return UserAccount;
};

export default getUserAccountModel;