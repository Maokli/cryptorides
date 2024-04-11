/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: "1d" },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
