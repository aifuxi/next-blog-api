import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : '.development.env',
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
