import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  projectId: string;
}
