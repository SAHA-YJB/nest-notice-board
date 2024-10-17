import { Controller, Get, Logger } from '@nestjs/common';

import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

// 컨트롤러는 라우팅을 담당
// 아무것도 인수로 지정하지 않으면 기본 주소로 사용
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  // Logger 인스턴스를 생성
  private readonly logger = new Logger('AppController');

  // Get 데코레이터를 사용하여 기본 경로('/')에 대한 GET 요청을 처리
  @Get()
  getHello(@Ip() ip: string): string {
    // 환경 변수를 로그로 출력
    this.logger.log(this.configService.get('ENVIRONMENT'));
    // 클라이언트의 IP 주소를 로그로 출력
    this.logger.log(`${ip} 접속`);
    // AppService의 getHello 메서드를 호출하여 응답을 반환
    return this.appService.getHello();
    // 예외를 던질 수 있는 코드 예시
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  // 주석 처리된 코드: 특정 경로에 대한 GET 요청을 처리하는 예시
  // Get 데코레이터를 사용하여 라우팅 주소를 설정
  // http://localhost:4000/name
  // @Get('name')
  // getName() {
  //   return 'saha';
  // }

  // 매개변수를 경로로 받는 예시
  // http://localhost:4000/name/saha
  // @Get('name/:name')
  // getName(@Param('name') name: string): string {
  //   return `Hello ${name}`;
  // }

  // 쿼리 매개변수를 받는 예시
  // http://localhost:4000/name?q=saha
  // @Get('name')
  // getName2(@Query('q') q: string): string {
  //   return `Hello ${q}`;
  // }
}
