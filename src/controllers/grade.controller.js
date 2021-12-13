import BaseCtrl from './base'
import db from '../models/index'
import { controller, get, post, del, put } from 'route-decorators'
import httpStatusCodes from 'http-status-codes'
import { auth } from '../middleware'
import debug from 'src/utils/debug'
import { Op } from 'sequelize'
import classroomService from 'src/services/classroom.service'
import { CLASSROOM_ROLE } from 'src/utils/constants'

@controller('/api/classrooms/:id/grades')
class GradesCtrl extends BaseCtrl {
  @post('/', auth())
  async createGrade(req, res) {
    let { point, name, index } = req.body
    let { id: classroomId } = req.params
    // TODO: Check user is belong to classroom

    if (!name && !point) {
      res.status(httpStatusCodes.BAD_REQUEST).send('Name and point is required')
    }

    try {
      grade = await db.Grade.create({
        name: name,
        point: point,
        index: index,
        classroomId,
      })
    } catch (error) {
      debug.log('grade-ctrl', error)
    }
    res.status(httpStatusCodes.OK).send(result)
  }

  @put('/arrange/:idGrade1/:idGrade2', auth())
  async arrangeGrade(req, res) {
    try {
      const { idGrade1: id1, idGrade2: id2 } = req.params
      const { id: classroomId } = req.params
      //Find index 2 grade to swap
      const indexs = await db.Grade.findAll({
        attributes: { exclude: ['password'] },
        where: { [Op.or]: [{ id: id1 }, { id: id2 }], classroomId: classroomId },
      })
      //Swap 2 grade index
      await db.Grade.update(
        {
          index: indexs[1].index,
        },
        {
          where: { id: id1 },
        }
      )
      await db.Grade.update(
        {
          index: indexs[0].index,
        },
        {
          where: { id: id2 },
        }
      )
      const Grades = await db.Grade.findAll({
        where: { classroomId },
      })
      res.status(httpStatusCodes.OK).json(Grades)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }

  @get('/', auth())
  async getGrades(req, res) {
    const { id: classroomId } = req.params

    let grades

    try {
      grades = await db.Grade.findAll({
        where: { classroomId },
        include: [
          {
            model: db.GradeUser,
            include: db.User,
          },
        ],
      })
    } catch (error) {
      debug.log('grade-ctrl', error)
    }
    res.status(httpStatusCodes.OK).send(grades)
  }

  @put('/:gradeId', auth())
  async updateGrade(req, res) {
    let { gradeId } = req.params
    let { name, point } = req.body
    if (!name && !point) {
      res.status(httpStatusCodes.BAD_REQUEST).send('Name and point is required')
    }
    try {
      await db.Grade.update(
        {
          name: name,
          point: point,
        },
        { where: { id: gradeId } }
      )
    } catch (error) {
      debug.log('grade-ctrl', error)
    }
    res.status(httpStatusCodes.OK).send({ message: 'Update assignment successful' })
  }

  @del('/:gradeId', auth())
  async deleteGrade(req, res) {
    const { gradeId } = req.params
    await db.Grade.destroy({
      where: {
        id: gradeId,
      },
    })
    res.status(httpStatusCodes.OK).send({ message: 'Delete assignment successful' })
  }
}

export default GradesCtrl
