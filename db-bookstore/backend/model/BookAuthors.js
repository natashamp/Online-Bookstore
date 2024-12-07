const getBookAuthorModel = (sequelize, { DataTypes }) => {
  const BookAuthor = sequelize.define('BookAuthor', {
    BookID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books', // Name of the referenced table
        key: 'BookID',  // Key in the referenced table
      },
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    AuthorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Authors', // Name of the referenced table
        key: 'AuthorID',  // Key in the referenced table
      },
      onDelete: 'CASCADE',
      primaryKey: true,
    },
  });

  BookAuthor.associate = (models) => {
    BookAuthor.belongsTo(models.Book, {
      foreignKey: 'BookID',
      onDelete: 'CASCADE',
    });
    BookAuthor.belongsTo(models.Author, {
      foreignKey: 'AuthorID',
      onDelete: 'CASCADE',
    });
  };

  return BookAuthor;
};

export default getBookAuthorModel;