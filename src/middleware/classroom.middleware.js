import db from 'src/models'
import { CLASSROOM_ROLE } from 'src/utils/constants'

export function ensureTeacher() {
  return async (req, res, next) => {
    const userId = req.user.id
    const { id: classroomId } = req.params
    const isTeacher = await db.ClassroomUser.findOne({
      where: {
        userId,
        classroomId,
        role: CLASSROOM_ROLE.TEACHER,
      },
    })

    if (!isTeacher) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .send({ message: 'Not have permission to invite user' })
    }

    next && (await next())
  }
}
