import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TaskStatus {
  NEW = 'new',
  COMPLETE = 'complete',
}

export class ToggleTaskStatusDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
