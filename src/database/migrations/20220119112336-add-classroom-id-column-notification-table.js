'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Notifications', 'classroomId', {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Classrooms',
          key: 'id',
        },
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('Notifications', 'classroomId')])
  },
}
