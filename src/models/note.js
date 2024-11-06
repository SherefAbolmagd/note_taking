module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("Note", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM({
        values: ["work", "personal"],
      }),
      allowNull: false,
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  return Note;
};
