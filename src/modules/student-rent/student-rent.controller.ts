import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentRentService } from './student-rent.service';
import { CreateStudentRentDto } from './dto/create-student-rent.dto';
import { UpdateStudentRentDto } from './dto/update-student-rent.dto';

@Controller('student-rent')
export class StudentRentController {
  constructor(private readonly studentRentService: StudentRentService) {}

  @Post()
  create(@Body() createStudentRentDto: CreateStudentRentDto) {
    return this.studentRentService.create(createStudentRentDto);
  }

  @Get()
  findAll() {
    return this.studentRentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentRentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentRentDto: UpdateStudentRentDto) {
    return this.studentRentService.update(+id, updateStudentRentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentRentService.remove(+id);
  }
}
