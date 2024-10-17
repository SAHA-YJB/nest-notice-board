import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import ConfigModule from './config/index';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  // imports 배열은 이 모듈에서 사용할 다른 모듈을 지정
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    BoardModule,
  ],
})
// AppModule 클래스는 애플리케이션의 루트 모듈
// NestModule 인터페이스를 구현하여 미들웨어를 설정할 수 있음
export class AppModule implements NestModule {
  // configure 메서드는 미들웨어를 설정하는 데 사용
  configure(consumer: MiddlewareConsumer) {
    // LoggingMiddleware를 모든 경로에 적용
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
