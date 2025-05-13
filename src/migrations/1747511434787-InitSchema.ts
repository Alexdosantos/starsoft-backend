import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1747511434787 implements MigrationInterface {
  name = 'InitSchema1747511434787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "status" "public"."orders_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7050e0162dfb1059bcf8ea3460"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e3cd5fc507e557ae493fb98074"`,
    );
    await queryRunner.query(`DROP TABLE "orders_items_items"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "items"`);
  }
}
