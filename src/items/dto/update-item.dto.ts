// import { PartialType } from '@nestjs/mapped-types';
// import { CreateItemDto } from './create-item.dto';

import { CreateCommentDto } from './create-comment.dto';

// export class UpdateItemDto extends PartialType(CreateItemDto) {}

// update only some fields
export class UpdateItemDto {
  public: boolean;
  comments: CreateCommentDto[];
}
