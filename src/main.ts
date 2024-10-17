import { NestFactory } from '@nestjs/core';

// 애플리케이션의 루트 모듈인 AppModule을 임포트
import { AppModule } from './app.module';

// Swagger 문서화를 위한 DocumentBuilder와 SwaggerModule을 임포트
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 커스텀 예외 필터인 HttpExceptionFilter를 임포트
import { HttpExceptionFilter } from './exceptions/http.exception';

// 비동기 함수 bootstrap을 정의하여 애플리케이션을 초기화하고 실행
async function bootstrap() {
  // NestJS 애플리케이션을 생성
  const app = await NestFactory.create(AppModule);

  // 전역 예외 필터를 설정하여 모든 예외를 HttpExceptionFilter로 처리
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger 문서화를 위한 설정을 정의
  const config = new DocumentBuilder()
    .setTitle('nest-board') // API의 제목을 설정
    .setDescription('nest-board API description') // API의 설명을 설정
    .setVersion('1.0') // API의 버전을 설정
    .addTag('Board') // 'Board' 태그를 추가하여 컨트롤러와 매핑
    .build();

  // Swagger 문서를 생성
  const document = SwaggerModule.createDocument(app, config);
  // Swagger UI를 '/api' 경로에 설정
  SwaggerModule.setup('api', app, document);

  // 애플리케이션을 4000번 포트에서 실행
  await app.listen(4000);
}

// bootstrap 함수를 호출하여 애플리케이션을 시작
bootstrap();
