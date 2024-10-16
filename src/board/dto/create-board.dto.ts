import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

// 유효성 검사를 위한 데코레이터
export class CreateBoardDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  // 스웨거 설명
  @ApiProperty({
    description: '게시글 제목',
    required: true,
    example: '제목입니다.',
  })
  title: string;

  @IsNotEmpty()
  // 스웨거 설명
  @ApiProperty({
    description: '게시글 내용',
    required: true,
    example: '안녕하세요.',
  })
  content: string;
}
