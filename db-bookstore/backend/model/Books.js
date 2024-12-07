const getBookModel = (sequelize, { DataTypes }) => {
  const Book = sequelize.define('Book', {
    BookID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ISBN: {
      type: DataTypes.STRING(13),
      unique: true,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Publisher: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    PublicationYear: {
      type: DataTypes.INTEGER, // Sequelize does not have a YEAR type, use INTEGER instead
    },
    Edition: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        min: 0,
      },
    },
    Stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  });

  return Book;
};

export default getBookModel;