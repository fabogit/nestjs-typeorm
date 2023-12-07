import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });

    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );

    const item = new Item({
      ...createItemDto,
      comments: [],
      tags,
      listing,
    });
    await this.entityManager.save(item);
    // show the created item if needed
    // return this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true, tags: true },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // Single transaction code
    // const item = await this.itemsRepository.findOneBy({ id });
    // item.public = updateItemDto.public;
    // const comments = updateItemDto.comments.map(
    //   (createCommentDto) => new Comment(createCommentDto),
    // );
    // item.comments = comments;
    // await this.entityManager.save(item);

    // async transactions to rollback in case of any error

    await this.entityManager.transaction(async (entityManager) => {
      const item = await this.itemsRepository.findOneBy({ id });
      item.public = updateItemDto.public;
      const comments = updateItemDto.comments.map(
        (createCommentDto) => new Comment(createCommentDto),
      );
      item.comments = comments;
      // 1st transaction
      await entityManager.save(item);
      const tagContent = `${Math.random()}`;
      const tag = new Tag({ content: tagContent });
      // FORCE AN ERROR
      // throw new Error('Error! Rolled back all Transactions');
      // 2nd transaction
      await entityManager.save(tag);
    });
  }

  async remove(id: number) {
    await this.itemsRepository.delete(id);
    // return delete operation result
    // return this.itemsRepository.delete(id);
  }
}
