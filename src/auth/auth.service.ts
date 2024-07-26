import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDTO } from '../types';
import { MailingService } from 'src/mailing/mailing.service';

export class LoginDTO {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly mailService: MailingService,
  ) {
    //super();
  }
  async signup(data: UserCreateDTO) {
    try {
      const { password, ...other } = data;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const response = await this.userService.createUser({
        password: hash,
        ...other,
      });
      await this.mailService.sendUserConfirmationForAccountVerification(
        response.email,
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async login(data: LoginDTO) {
    // This method would authenticate the user. Since the DTO types are similar,
    // you can use a single method and perform different actions based on the DTO type.
    const user = await this.userService.findOneByEmail(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Validate password
    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('User not found');
    }
    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const message = 'Signed In succesfully, Welcome back!';
    return {
      message: message,
      access_token: await this.generateAccessToken(user.email, user.id),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // ... other methods like `login` that issues JWT, etc.

  async generateAccessToken(email: any, userId: string): Promise<string> {
    const payload = { username: email, sub: userId };
    return this.jwtService.sign(payload, { expiresIn: '6d' }); // short-lived access token
  }
}
