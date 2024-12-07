const getBookGenreModel = (sequelize, { DataTypes }) => {
  const BookGenre = sequelize.define('BookGenre', {
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
    GenreID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Genres', // Name of the referenced table
        key: 'GenreID',  // Key in the referenced table
      },
      onDelete: 'CASCADE',
      primaryKey: true,
    },
  });

  BookGenre.associate = (models) => {
    BookGenre.belongsTo(models.Book, {
      foreignKey: 'BookID',
      onDelete: 'CASCADE',
    });
    BookGenre.belongsTo(models.Genre, {
      foreignKey: 'GenreID',
      onDelete: 'CASCADE',
    });
  };

  return BookGenre;
};

export default getBookGenreModel;