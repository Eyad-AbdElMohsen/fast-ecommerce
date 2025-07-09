import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from './input/create-user.input';
import { LoginInput } from './input/login-input';
import { JwtPayload } from 'src/types/jwt.type';
import { UserRoleEnum } from './enums/user-role.enum';
import { CreateAdminInput } from './input/create-admin.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById(id: number) {
    return await this.userRepo.findOneByOrFail({ id });
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async getAdmins() {
    return await this.userRepo.find({
      where: { role: UserRoleEnum.ADMIN },
    });
  }

  async register(input: CreateUserInput) {
    try {
      const isAlreadyExist = await this.getUserByEmail(input.email);
      if (isAlreadyExist)
        throw new HttpException(
          'Email is Already Exist!',
          HttpStatus.BAD_REQUEST,
        );
      input.password = await bcrypt.hash(input.password, 10);

      const newUser = this.userRepo.create(input);
      return await this.userRepo.save(newUser);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createAdmin(input: CreateAdminInput) {
    try {
      const isAlreadyExist = await this.getUserByEmail(input.email);
      if (isAlreadyExist)
        throw new HttpException(
          'Email is Already Exist!',
          HttpStatus.BAD_REQUEST,
        );
      input.password = await bcrypt.hash(input.password, 10);

      const newAdmin = this.userRepo.create(input);
      return await this.userRepo.save(newAdmin);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(input: LoginInput) {
    const user = await this.getUserByEmail(input.email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch)
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      securityGroupId: user.securityGroupId || null,
    };

    const token = this.jwtService.sign(payload);

    user.access_token = token;

    return user;
  }

  async updateOrCreate(securityGroupId: number) {
    let user = await this.userRepo.findOne({
      where: { securityGroupId },
    });

    //upsert admin user
    // name, password and email should be from environment variables or config
    // but for simplicity, we are using hardcoded values here
    if (user) {
      await this.userRepo.update(user.id, {
        email: 'admin@admin.com',
        name: 'admin',
        password: await bcrypt.hash('pass', 10),
        role: UserRoleEnum.SUPER_ADMIN,
        securityGroupId,
      });
    } else {
      const newUser = this.userRepo.create({
        email: 'admin@admin.com',
        name: 'admin',
        role: UserRoleEnum.SUPER_ADMIN,
        password: await bcrypt.hash('pass', 10),
        securityGroupId,
      });
      await this.userRepo.save(newUser);
    }
    return true;
  }
}
