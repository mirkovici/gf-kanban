import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => LoginResponse, { name: 'login' })
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<LoginResponse> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user_id: user.id,
    };
  }
}
