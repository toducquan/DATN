import { Injectable } from '@nestjs/common';
import { CreateStudentRentDto } from './dto/create-student-rent.dto';
import { UpdateStudentRentDto } from './dto/update-student-rent.dto';

@Injectable()
export class StudentRentService {
  create(createStudentRentDto: CreateStudentRentDto) {
    return 'This action adds a new studentRent';
  }

  findAll() {
    return `This action returns all studentRent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentRent`;
  }

  update(id: number, updateStudentRentDto: UpdateStudentRentDto) {
    return `This action updates a #${id} studentRent`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentRent`;
  }
}
