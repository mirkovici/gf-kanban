import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from '@/db/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure ConfigModule is properly initialized
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for environment-based setup
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'defaultSecretKey'), // Use a default value as a fallback
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h'),
        }, // Default expiry time
      }),
    }),
  ],
  providers: [UserService, UserResolver], // Register UserService and UserResolver
  exports: [UserService, JwtModule], // Export UserService and JwtModule
})
export class UserModule {}
