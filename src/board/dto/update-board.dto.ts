import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  title?: string;

  @IsOptional()
  content?: string;
}

// PartialType타입으로 확장을 위해서는 IsNotEmpty를 사용할 수 없다
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['title']) {}
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['title']) {}
