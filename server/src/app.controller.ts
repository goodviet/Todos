import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import UserModel, { UserDocument } from './model/user.model';
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }



  @Get('')
  getHello(): string{
    return this.appService.getHello();
  };

  // CREATE
  @Post('/create')
  async create(@Req() req, @Res() res) {
    try {
      const { name, description } = req.body;

      const checkNameInDB = await UserModel.find({ name }).limit(1).select('_id').exec();
      if (checkNameInDB.length > 0) {
        res.status(403).json({
          message: 'Success',
          code: 200,
          data: { error: 'Data already exists', code: 603 }
        });
        return;
      }

      const data: UserDocument = await UserModel.create({
        name,
        description
      });
      res.status(200).json({
        message: 'Created Success User',
        code: 200,
        data
      });

    } catch (error) {
      res.status(500).json({
        message: 'Error',
        code: 500,
        error: error.message
      });
    }
  };


  // GET LIST USER
  @Get('/getList')
  async getList(@Req() req, @Res() res) {
    try {
      const getList = await UserModel.find({}, {
        name: 1,
        description: 1,
      })
      const countUserInDB = getList.length;
      res.status(200).json({
        countUser: countUserInDB,
        listUser: getList
      })
    } catch (error) {
      res.status(403).json({
        message: "Error"
      })
    }
  }


  // DELETE USER
  @Delete('/delete/:id')
  async deleteUser(@Req() req, @Res() res) {
    const ObjectId = mongoose.Types.ObjectId;
    if (ObjectId.isValid(req.params.id) == false) {
      res.status(403).json({
        message: 'Success',
        code: 403,
        error: 'Data does not exist'
      })
      return
    }

    const checkID = await UserModel.find(
      { _id: new mongoose.Types.ObjectId(req.params.id) }).exec()

    if (checkID === null) {
      res.status(403).json({
        message: 'Success',
        code: 403,
        error: 'Data does not exist'
      })
      return
    }

    const data = await UserModel.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) }).exec()

    res.status(200).json({
      message: 'Success',
      code: 200,
      data: {
        result: 'Delete User Successfully',
        field: data
      }
    })

  }


  
  // UPDATE USER
  @Put('/update/:id')
  async updateUser(@Req() req, @Res() res) {
    try {
      const { name, description } = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
      res.status(200).json({
        code: 200,
        message: "Update User Successfully",
        data: updatedUser,

      })
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  }

}
