import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableCustomers1746672589831 implements MigrationInterface {
  name = 'TableCustomers1746672589831';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "quantity" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "items" ADD "orderId" integer`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "customerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_9e039229fb4b5a379ab79e887ad" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_9e039229fb4b5a379ab79e887ad"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customerId"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "orderId"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "quantity"`);
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
