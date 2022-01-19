export default (sequelize, DataTypes) => {
  const schema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
      },
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    classroomId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Classroom',
        key: 'id',
      },
    },
  }

  const notificationModel = sequelize.define('Notification', schema)

  return notificationModel
}
