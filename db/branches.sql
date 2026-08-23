/*
 Navicat Premium Data Transfer

 Source Server         : postgres15
 Source Server Type    : PostgreSQL
 Source Server Version : 150013 (150013)
 Source Host           : localhost:5444
 Source Catalog        : ecgo
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150013 (150013)
 File Encoding         : 65001

 Date: 24/08/2026 02:59:25
*/


-- ----------------------------
-- Table structure for branches
-- ----------------------------
DROP TABLE IF EXISTS "public"."branches";
CREATE TABLE "public"."branches" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" text COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of branches
-- ----------------------------
INSERT INTO "public"."branches" VALUES ('bcde6e8a-4fa5-430f-a0e1-6967ff9eef3d', 'Branch 01');
INSERT INTO "public"."branches" VALUES ('3ed03d16-88d8-4e4f-aa07-025438a0b39a', 'Branch 02');
INSERT INTO "public"."branches" VALUES ('72a719f0-718e-45a4-8680-60f9df3e93a2', 'Branch 03');
INSERT INTO "public"."branches" VALUES ('81eecd88-7eb9-4a6d-822c-b124c3fc7441', 'Branch 04');
INSERT INTO "public"."branches" VALUES ('ea10c966-7183-4e47-9f4a-01ceb38f511b', 'Branch 05');
INSERT INTO "public"."branches" VALUES ('3a87a2d4-e28f-4ccc-bb40-008395ed497d', 'Branch 06');
INSERT INTO "public"."branches" VALUES ('936571bf-9f4d-4fe4-abc8-499d35a690d4', 'Branch 07');
INSERT INTO "public"."branches" VALUES ('1d114f91-4e67-4891-98a5-2d3b53675279', 'Branch 08');
INSERT INTO "public"."branches" VALUES ('bd61b007-02e6-452f-a145-9f44b9575d44', 'Branch 09');
INSERT INTO "public"."branches" VALUES ('4a28d18e-43fe-40c1-a7fb-65c12987b6fe', 'Branch 10');

-- ----------------------------
-- Uniques structure for table branches
-- ----------------------------
ALTER TABLE "public"."branches" ADD CONSTRAINT "branches_name_key" UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table branches
-- ----------------------------
ALTER TABLE "public"."branches" ADD CONSTRAINT "branches_pkey" PRIMARY KEY ("id");
