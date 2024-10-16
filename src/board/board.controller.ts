import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';

// 컨트롤러는 라우팅 주소를 만든다 API 엔드포인트
@Controller('board')
@ApiTags('Board')
export class BoardController {
  // 서비스 연결
  constructor(private readonly boardService: BoardService) {}

  // board 라우팅 주소
  // http://localhost:4000/board
  // 전체 게시글 조회
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  // 게시글 상세 조회
  // ParseIntPipe는 파라미터를 정수로 변환하는 파이프
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  // 게시글 생성
  // Post 데코레이터는 바디데코레이터를 통해서 가져온다
  @Post()
  create(@Body(new ValidationPipe()) data: CreateBoardDto) {
    return this.boardService.create(data);
  }

  // 게시글 수정
  // 업데이트 대상의 아이디를 받아오고 바디데코레이터를 통해서 가져온다
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data) {
    // 업데이트가 되는 아이디와 업데이트가 되는 데이터를 받아온다
    return this.boardService.update(id, data);
  }

  // 게시글 삭제
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}
