import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 내용',
    required: true,
    example: '안녕하세요.',
  })
  content: string;
}

// PartialType타입으로 확장을 위해서는 IsNotEmpty를 사용할 수 없다
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['title']) {}
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['title']) {}
