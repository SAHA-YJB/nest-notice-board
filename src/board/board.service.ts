import { Injectable } from '@nestjs/common';

// 서비스는 실제 비즈니스 로직을 만든다
@Injectable()
export class BoardService {
  // 더미 게시글 목록
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

  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }
  getBoardIndex(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }

  findAll() {
    return this.boards;
  }

  findOne(id: number) {
    const index = this.getBoardIndex(id);
    return this.boards[index];
  }

  create(data) {
    const newBoard = {
      id: this.getNextId(),
      ...data,
    };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, data) {
    const index = this.getBoardIndex(id);

    if (index > -1) {
      this.boards[index] = { ...this.boards[index], ...data };
      return this.boards[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.getBoardIndex(id);
    if (index > -1) {
      const deletedBoard = this.boards[index];
      this.boards.splice(index, 1);
      return deletedBoard;
    }
    return null;
  }
}
