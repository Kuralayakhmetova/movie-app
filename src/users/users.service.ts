import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: dto
    });
  }

  async getProfile(id: string) {
   const user = await this.prismaService.user.findUnique({
     where: { id },
     select: {
       id: true,
       email: true,
       name: true,
       role: true,
       createdAt: true,
       reviews: {
         select: {
           id: true,
           rating: true,
           comment: true,
           movie: {
             select: { id: true, title: true },
           },
           createdAt: true,
         },
         orderBy: { createdAt: 'desc' },
       },
     },
   });


   if (!user) throw new NotFoundException('Пользователь не найден');
   return user;
 }


  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
