import { JwtModuleOptions, JwtOptionsFactory } from './../../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';

export const jwtOptions : JwtModuleOptions = {

    secret: process.env.JWT_SECRET,

    signOptions:{
        expiresIn: process.env.JWT_EXPIRE
    }
}

// or use the class for async intialization
export class JwtConfigService implements JwtOptionsFactory {
    createJwtOptions(): JwtModuleOptions {

        return {

            // the global option allows for the jwt to be imported once for the whole program to recognize it.
            // allows for registering the JwtModule as global to make things easier for us. This means that we don't need to import the JwtModule anywhere else in our application.
            // global:true,
            secret: process.env.JWT_SECRET,

            signOptions:{
                expiresIn: process.env.JWT_EXPIRE
            }
      };

    }
}