// import { PartialType } from '@nestjs/mapped-types';
// import { CreateItemDto } from './create-item.dto';

// export class UpdateItemDto extends PartialType(CreateItemDto) {}

// update only some fields
export class UpdateItemDto {
  public: boolean;
}
