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
  // 더미 게시글 목록을 정의
  // 실제 애플리케이션에서는 데이터베이스를 사용하지만,
  // 여기서는 예시로 메모리 내 배열을 사용
  private boards = [
    {
      id: 1,
      title: '제목1',
      content: '내용1',
    },
    {
      id: 2,
      title: '제목2',
      content: '내용2',
    },
    {
      id: 3,
      title: '제목3',
      content: '내용3',
    },
    {
      id: 4,
      title: '제목4',
      content: '내용4',
    },
    {
      id: 5,
      title: '제목5',
      content: '내용5',
    },
  ];

  // 다음 게시글의 ID를 생성하는 메서드
  // 현재 게시글 목록에서 가장 큰 ID를 찾아 그 다음 ID를 반환
  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }

  // 특정 ID를 가진 게시글의 인덱스를 찾는 메서드
  // 배열에서 해당 ID를 가진 게시글의 위치를 반환
  getBoardIndex(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }

  // 모든 게시글을 반환하는 메서드
  async findAll() {
    return this.boardRepository.find();
  }

  // 특정 ID를 가진 게시글을 반환하는 메서드
  // 게시글이 존재하지 않으면 undefined를 반환
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
    const board = await this.boardRepository.findOneBy({ id });

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
    const board = await this.boardRepository.findOneBy({ id });

    if (!board) {
      throw new HttpException(
        '게시글을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.boardRepository.delete(id);
  }
}
