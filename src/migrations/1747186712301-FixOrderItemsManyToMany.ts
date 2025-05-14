import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixOrderItemsManyToMany1747186712301
  implements MigrationInterface
{
  name = 'FixOrderItemsManyToMany1747186712301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_9e039229fb4b5a379ab79e887ad"`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_items_items" ("ordersId" integer NOT NULL, "itemsId" integer NOT NULL, CONSTRAINT "PK_d2e676ec3e80271fd897f311077" PRIMARY KEY ("ordersId", "itemsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e3cd5fc507e557ae493fb98074" ON "orders_items_items" ("ordersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7050e0162dfb1059bcf8ea3460" ON "orders_items_items" ("itemsId") `,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "orderId"`);
    await queryRunner.query(
      `ALTER TABLE "orders_items_items" ADD CONSTRAINT "FK_e3cd5fc507e557ae493fb980749" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items_items" ADD CONSTRAINT "FK_7050e0162dfb1059bcf8ea34608" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_items_items" DROP CONSTRAINT "FK_7050e0162dfb1059bcf8ea34608"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_items_items" DROP CONSTRAINT "FK_e3cd5fc507e557ae493fb980749"`,
    );
    await queryRunner.query(`ALTER TABLE "items" ADD "orderId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7050e0162dfb1059bcf8ea3460"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e3cd5fc507e557ae493fb98074"`,
    );
    await queryRunner.query(`DROP TABLE "orders_items_items"`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_9e039229fb4b5a379ab79e887ad" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
