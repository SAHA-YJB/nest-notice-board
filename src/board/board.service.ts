import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

// 서비스는 실제 비즈니스 로직을 구현
// 비즈니스 로직은 데이터를 CRUD(생성, 읽기, 업데이트, 삭제) 처리하거나
// 저장하는 로직
@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  // 모든 게시글을 반환하는 메서드
  async findAll() {
    return this.boardRepository.find();
  }

  // 특정 ID를 가진 게시글을 반환하는 메서드
  async findOne(id: number) {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new HttpException(
        '게시글을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return board;
  }
  // 새로운 게시글을 생성하는 메서드
  // CreateBoardDto를 사용하여 새로운 게시글의 데이터를 받아온다
  async create(data: CreateBoardDto) {
    return await this.boardRepository.save(data);
  }

  // 특정 ID를 가진 게시글을 업데이트하는 메서드
  // UpdateBoardDto를 사용하여 업데이트할 데이터를 받아온다
  async update(id: number, data: UpdateBoardDto) {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new HttpException(
        '게시글을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.boardRepository.update(id, { ...data });
  }

  // 특정 ID를 가진 게시글을 삭제하는 메서드
  // 삭제된 게시글을 반환하며, 게시글이 존재하지 않으면 null을 반환
  async remove(id: number) {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new HttpException(
        '게시글을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.boardRepository.remove(board);
  }

  async getBoardById(id: number) {
    return this.boardRepository.findOneBy({ id });
  }
}
