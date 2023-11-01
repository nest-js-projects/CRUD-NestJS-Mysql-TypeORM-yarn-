import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { CreateUserPostDto } from '../../dtos/CreateUserPost.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../../../typeorm/entities/User';

@ApiTags('User-Controller')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Get all users',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'No users available, Register a new user!',
  })
  getUsers() {
    return this.usersService.findUsers();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'save users',
    type: User,
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'user update',
  })
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiUnauthorizedResponse({
    description: 'unauthorized delete',
  })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.usersService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.usersService.createUserPost(id, createUserPostDto);
  }
}
