import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

// 모듈은 컨트롤러, 서비스, 레포지토리 등을 모아놓은 것
@Module({
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
