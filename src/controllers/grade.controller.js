import BaseCtrl from './base'
import db from '../models/index'
import { controller, get, post, put } from 'route-decorators'
import httpStatusCodes from 'http-status-codes'
import { auth } from '../middleware'

@controller('/api/classrooms/:id/grades')
class GradesCtrl extends BaseCtrl {
  @post('/')
  async createGrade(req, res) {
    let { point, name } = req.body
    let { id: classroomId } = req.params

    // TODO: Check user is belong to classroom

    if (!name && !point) {
      res.status(httpStatusCodes.BAD_REQUEST).send('Name and point is required')
    }

    let grade
    try {
      grade = await db.Grade.create({
        name: name,
        point: point,
        classroomId,
      })
      console.log('classroomId:', classroomId, 'name:', name, 'point:', point)
    } catch (error) {
      console.log(error)
    }
    res.status(httpStatusCodes.OK).send(grade)
  }
  @put('/:id_grade')
  async updateGrade(req, res) {
    let { id_grade: id } = req.params

    let { id: classroomId } = req.params
    let { name, point } = req.body
    console.log('id _11__grade ', id)
    let grade
    try {
      grade = await db.Grade.findOne({ where: { id } })
      grade.name = name
      grade.point = point
      grade.classroomId = classroomId
      await grade.save()
    } catch (error) {
      console.log(error)
    }
    res.status(httpStatusCodes.OK).send(grade)
  }
}
export default GradesCtrl
