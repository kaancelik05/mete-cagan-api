import { ApiProperty } from '@nestjs/swagger';

export class AuditDto {
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  createdBy: string;
  @ApiProperty()
  lastmodifiedDate: Date;
  @ApiProperty()
  lastmodifiedBy: string;
  @ApiProperty()
  active: boolean;
}
