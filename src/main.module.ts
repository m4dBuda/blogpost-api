import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogpostModule } from './modules/blogpost/blogpost.module';
import { HealthModule } from './modules/health/health.module';
import { LikeModule } from './modules/like/like.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CommonModule,
    InfrastructureModule,
    HealthModule,
    AuthModule,
    UserModule,
    BlogpostModule,
    LikeModule,
  ],
})
export class MainModule {}
