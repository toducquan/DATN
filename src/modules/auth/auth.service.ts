import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(payload: RegisterUserDto) {
    const hashPW = await bcrypt.hash(payload.password, bcrypt.genSaltSync(12));
    const newUser = await this.usersService.createUser({
      ...payload,
      password: hashPW,
      role: Role.USER,
    });
    return this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
  }

  async login(payload: LoginUserDto) {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatchingPW = await bcrypt.compare(payload.password, user.password);
    if (isMatchingPW) {
      return this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    }
  }
}
