import { hashPassword } from 'src/utils/crypto'
import { ACCOUNT_STATUS, CLASSROOM_ROLE } from 'src/utils/constants'

export default {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await hashPassword('admin')
    return queryInterface.bulkUpdate('Users', {
      role: CLASSROOM_ROLE.USER,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { username: 'admin' })
  },
}
