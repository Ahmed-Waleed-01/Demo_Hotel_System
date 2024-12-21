
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/db/entities/user.entity';
import { ROLES_KEY } from '../decorator/set-role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //extracting the user roles that were defined in the metadata.
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(),context.getClass()]);

    const { user } = context.switchToHttp().getRequest();

    // //if no roles were passed then we allow any role to pass.
    // if(!requiredRoles)
    //     return true;

    //checking if the accessing user has a required role.
    if(!requiredRoles.includes(user.role))
        throw new HttpException(`Account role is not allowed to use this feature`,HttpStatus.FORBIDDEN);

    return true;
  }
}
