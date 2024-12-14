import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(private readonly jwtService:JwtService,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{

    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];

    if (!token) {
      throw new UnauthorizedException('You have not passed a token.');
    }

    try {
      const payload = this.jwtService.verify(token);
      // request['payload']=payload;
      const checkUser = await this.userRepo.findOne({where: {id:payload.id, email:payload.email}});

      if(!checkUser)
        throw new HttpException('you have passed an invalid token.',HttpStatus.UNAUTHORIZED);

      request.user = checkUser;
      
    } catch (error) {
      throw new UnauthorizedException('You have passed an invalid token.');
    }

    return true;
  }
}
