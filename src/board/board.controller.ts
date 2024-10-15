import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';

// 컨트롤러는 라우팅 주소를 만든다
@Controller('board')
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
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.boardService.findOne(Number(id));
  }

  // 게시글 생성
  // Post 데코레이터는 바디데코레이터를 통해서 가져온다
  @Post()
  create(@Body() data) {
    return this.boardService.create(data);
  }

  // 게시글 수정
  // 업데이트 대상의 아이디를 받아오고 바디데코레이터를 통해서 가져온다
  @Put(':id')
  update(@Param('id') id: number, @Body() data) {
    // 업데이트가 되는 아이디와 업데이트가 되는 데이터를 받아온다
    return this.boardService.update(Number(id), data);
  }

  // 게시글 삭제
  @Delete(':id')
  remove(@Param('id') id: number) {
    return `board delete id: ${id}`;
  }
}
