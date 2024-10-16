import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

// 유효성 검사를 위한 데코레이터
export class CreateBoardDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  content: string;
}
