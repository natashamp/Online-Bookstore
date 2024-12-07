const getAuthorModel = (sequelize, { DataTypes }) => {
  const Author = sequelize.define('Author', {
    AuthorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  return Author;
};

export default getAuthorModel;