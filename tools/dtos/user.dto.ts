import { IsNotEmpty, IsEmail, IsDateString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserCreateDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @ApiProperty()
  birtDay: Date;
}

// tslint:disable-next-line: max-classes-per-file
export class UserUpdateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  birtDay: Date;
}

// tslint:disable-next-line: max-classes-per-file
export class UserLoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
