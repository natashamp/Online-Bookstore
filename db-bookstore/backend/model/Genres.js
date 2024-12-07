const getGenreModel = (sequelize, { DataTypes }) => {
  const Genre = sequelize.define('Genre', {
    GenreID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    GenreName: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  });

  return Genre;
};

export default getGenreModel;