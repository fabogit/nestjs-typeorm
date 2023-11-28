import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItems1701213225278 implements MigrationInterface {
  private readonly logger = new Logger(PublicItems1701213225278.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('UP');
    await queryRunner.query(
      `UPDATE item SET public = 1`,
      //   parameters,
      //   useStructuredResult,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('DOWN');
    await queryRunner.query(
      `UPDATE item SET public = 0`,
      //   parameters,
      //   useStructuredResult,
    );
  }
}
