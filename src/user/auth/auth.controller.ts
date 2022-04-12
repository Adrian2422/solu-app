import { AuthService } from './auth.service';
import { IUserType } from './../interfaces/IUserType';
import { User } from 'src/decorators/user.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SigninDto, SignupDto } from './../dtos/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/signup')
	signup(@Body() body: SignupDto) {
		return this.authService.signup(body);
	}

	@Post('/signin')
	signin(@Body() body: SigninDto) {
		return this.authService.signin(body);
	}

	@Get('/me')
	me(@User() user: IUserType) {
		return user;
	}
}
