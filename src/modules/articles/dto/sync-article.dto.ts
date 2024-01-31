import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SyncArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(6)
  description: string;
}
