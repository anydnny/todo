import { IsUUID } from 'class-validator';

export class ChangeTaskProjectDto {
  @IsUUID('4')
  projectId: string;
}
