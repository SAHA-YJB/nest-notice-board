import { ApiProperty } from '@nestjs/swagger'; // Swagger 문서화를 위한 데코레이터
import { IsNotEmpty, IsNumber } from 'class-validator'; // 유효성 검사를 위한 데코레이터

// CreateBoardDto 클래스는 게시판 생성 시 필요한 데이터 전송 객체(Data Transfer Object)
export class CreateBoardDto {
  // 이 필드는 비어 있을 수 없다
  @IsNumber()
  @ApiProperty({
    // Swagger 문서에 표시될 설명
    description: '작성자 아이디',
    // 이 필드는 필수
    required: true,
    // 예시 값
    example: '1',
  })
  // 게시글의 제목을 저장하는 필드
  userId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 내용',
    required: true,
    example: '안녕하세요.',
  })
  // 게시글의 내용을 저장하는 필드
  content: string;
}
