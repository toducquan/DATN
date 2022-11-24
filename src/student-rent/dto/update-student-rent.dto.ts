import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentRentDto } from './create-student-rent.dto';

export class UpdateStudentRentDto extends PartialType(CreateStudentRentDto) {}
