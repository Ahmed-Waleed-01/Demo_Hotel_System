import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/db/entities/user.entity';

export const ROLES_KEY = 'roles';
export const SetRoles = (...roles: UserRole[]) => {
    
    //setting the roles that can acess the endpoint to metadata.
    return SetMetadata(ROLES_KEY, roles);
}
