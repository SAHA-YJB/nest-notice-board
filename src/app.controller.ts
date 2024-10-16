import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';

// 컨트롤러는 라우팅이다
// 아무것도 인수로 있지 않다면 기본 주소로 사용한다. http://localhost:4000/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger();

  @Get()
  getHello(@Ip() ip: string): string {
    this.logger.log(`${ip} 접속`);
    return this.appService.getHello();
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  // Get 데코레이터를 사용하여 라우팅 주소를 설정
  // http://localhost:4000/name
  // @Get('name')
  // getName() {
  //   return 'saha';
  // }

  // 매개변수로 받기
  // http://localhost:4000/name/saha
  // @Get('name/:name')
  // getName(@Param('name') name: string): string {
  //   return `Hello ${name}`;
  // }

  // 쿼리 매개변수 받기
  // http://localhost:4000/name?q=saha
  // @Get('name')
  // getName2(@Query('q') q: string): string {
  //   return `Hello ${q}`;
  // }
}
