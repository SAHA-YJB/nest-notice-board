import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';

// 모듈은 관련된 컨트롤러, 서비스, 레포지토리 등을 하나로 묶어 관리하는 단위
// 모듈은 애플리케이션의 구조를 정의하고, 각 기능을 독립적으로 관리
@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  // 이 모듈에서 사용할 컨트롤러를 정의
  controllers: [BoardController],
  // 이 모듈에서 사용할 서비스를 정의
  providers: [BoardService],
})
// BoardModule 클래스는 'board' 기능과 관련된 모든 것을 포함하는 모듈
export class BoardModule {}
