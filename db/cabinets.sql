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

 Date: 24/08/2026 02:59:43
*/


-- ----------------------------
-- Table structure for cabinets
-- ----------------------------
DROP TABLE IF EXISTS "public"."cabinets";
CREATE TABLE "public"."cabinets" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "code" text COLLATE "pg_catalog"."default" NOT NULL,
  "branch_id" uuid NOT NULL,
  "status" text COLLATE "pg_catalog"."default" NOT NULL,
  "last_heartbeat" timestamptz(6)
)
;

-- ----------------------------
-- Records of cabinets
-- ----------------------------
INSERT INTO "public"."cabinets" VALUES ('c652bd8c-6be6-440f-89dc-a569f5fe7f4e', 'CAB-001', '3ed03d16-88d8-4e4f-aa07-025438a0b39a', 'OFFLINE', '2026-08-22 07:46:38.652+00');
INSERT INTO "public"."cabinets" VALUES ('fc8c7647-0876-49f5-b773-89413cc475de', 'CAB-002', '72a719f0-718e-45a4-8680-60f9df3e93a2', 'MAINTENANCE', '2026-08-22 05:49:57.943+00');
INSERT INTO "public"."cabinets" VALUES ('a8bea42b-a437-4167-a9c9-cdfba984e004', 'CAB-003', '81eecd88-7eb9-4a6d-822c-b124c3fc7441', 'ONLINE', '2026-08-22 08:06:30.127+00');
INSERT INTO "public"."cabinets" VALUES ('a63bd83a-8299-4c68-8aa8-0059d5829b82', 'CAB-004', 'ea10c966-7183-4e47-9f4a-01ceb38f511b', 'OFFLINE', '2026-08-22 06:57:18.19+00');
INSERT INTO "public"."cabinets" VALUES ('3b9c7ae7-2074-4dc5-8bf2-4c59ff4ad496', 'CAB-005', '3a87a2d4-e28f-4ccc-bb40-008395ed497d', 'MAINTENANCE', '2026-08-22 08:51:54.412+00');
INSERT INTO "public"."cabinets" VALUES ('ff4b6ed8-7aeb-4907-8ed3-d2a8a34242a9', 'CAB-006', '936571bf-9f4d-4fe4-abc8-499d35a690d4', 'ONLINE', '2026-08-22 08:49:58.473+00');
INSERT INTO "public"."cabinets" VALUES ('0c36c1ec-2564-4f56-861a-cde86d93ff98', 'CAB-007', '1d114f91-4e67-4891-98a5-2d3b53675279', 'OFFLINE', '2026-08-22 08:06:23.292+00');
INSERT INTO "public"."cabinets" VALUES ('e5bdaa3e-f800-448a-9063-4fad1801b72e', 'CAB-008', 'bd61b007-02e6-452f-a145-9f44b9575d44', 'MAINTENANCE', '2026-08-22 09:20:24.176+00');
INSERT INTO "public"."cabinets" VALUES ('5de1ca48-908e-44a6-83a6-c6ab749f454d', 'CAB-009', '4a28d18e-43fe-40c1-a7fb-65c12987b6fe', 'ONLINE', '2026-08-22 08:18:55.173+00');
INSERT INTO "public"."cabinets" VALUES ('91c06860-ea22-4c19-af13-734cd31fe474', 'CAB-010', 'bcde6e8a-4fa5-430f-a0e1-6967ff9eef3d', 'OFFLINE', '2026-08-22 06:29:04.916+00');
INSERT INTO "public"."cabinets" VALUES ('28e5fa39-9043-494e-8588-18abac29e868', 'CAB-011', '3ed03d16-88d8-4e4f-aa07-025438a0b39a', 'MAINTENANCE', '2026-08-22 04:46:27.125+00');
INSERT INTO "public"."cabinets" VALUES ('ce3d74fe-e9f3-4783-b735-916caa9ca1fb', 'CAB-012', '72a719f0-718e-45a4-8680-60f9df3e93a2', 'ONLINE', '2026-08-22 09:57:24.63+00');
INSERT INTO "public"."cabinets" VALUES ('6d1c64ea-594a-4b63-aa3c-1bd6732884cf', 'CAB-013', '81eecd88-7eb9-4a6d-822c-b124c3fc7441', 'OFFLINE', '2026-08-22 05:38:08.302+00');
INSERT INTO "public"."cabinets" VALUES ('759cf4dc-7a5a-438a-a76b-c9318fcf3de0', 'CAB-014', 'ea10c966-7183-4e47-9f4a-01ceb38f511b', 'MAINTENANCE', '2026-08-22 05:45:18.592+00');
INSERT INTO "public"."cabinets" VALUES ('7d00cb11-f5b7-4c0a-88a4-79cdb670574f', 'CAB-015', '3a87a2d4-e28f-4ccc-bb40-008395ed497d', 'ONLINE', '2026-08-22 04:26:15.434+00');
INSERT INTO "public"."cabinets" VALUES ('c47fc064-59ed-4b88-a96a-3bccda7d70d3', 'CAB-016', '936571bf-9f4d-4fe4-abc8-499d35a690d4', 'OFFLINE', '2026-08-22 09:52:23.578+00');
INSERT INTO "public"."cabinets" VALUES ('7800474c-9c2a-46e1-b38c-edb240c0bfec', 'CAB-017', '1d114f91-4e67-4891-98a5-2d3b53675279', 'MAINTENANCE', '2026-08-22 08:16:18.281+00');
INSERT INTO "public"."cabinets" VALUES ('d5f20596-ffaf-4955-a4fa-b1a38d74d6c0', 'CAB-018', 'bd61b007-02e6-452f-a145-9f44b9575d44', 'ONLINE', '2026-08-22 05:25:05.384+00');
INSERT INTO "public"."cabinets" VALUES ('3b432b26-668a-438e-95b8-22afe6f7524f', 'CAB-019', '4a28d18e-43fe-40c1-a7fb-65c12987b6fe', 'OFFLINE', '2026-08-22 08:08:00.874+00');
INSERT INTO "public"."cabinets" VALUES ('cb0ed443-23a8-4296-936a-ed338b2bc8d5', 'CAB-020', 'bcde6e8a-4fa5-430f-a0e1-6967ff9eef3d', 'MAINTENANCE', '2026-08-22 05:43:36.86+00');
INSERT INTO "public"."cabinets" VALUES ('1c12ff34-579a-4e9b-9b80-11a5304587b4', 'CAB-021', '3ed03d16-88d8-4e4f-aa07-025438a0b39a', 'ONLINE', '2026-08-22 09:18:05.898+00');
INSERT INTO "public"."cabinets" VALUES ('7a8ffa10-2e82-418f-980f-375d672ec816', 'CAB-022', '72a719f0-718e-45a4-8680-60f9df3e93a2', 'OFFLINE', '2026-08-22 09:32:06.13+00');
INSERT INTO "public"."cabinets" VALUES ('71495fba-b255-45da-aca0-d74929b30901', 'CAB-023', '81eecd88-7eb9-4a6d-822c-b124c3fc7441', 'MAINTENANCE', '2026-08-22 07:22:17.013+00');
INSERT INTO "public"."cabinets" VALUES ('6411c522-b3a0-415f-b683-4fca184f9c10', 'CAB-024', 'ea10c966-7183-4e47-9f4a-01ceb38f511b', 'ONLINE', '2026-08-22 09:00:39.216+00');
INSERT INTO "public"."cabinets" VALUES ('8a9989a8-f607-4b84-a3f8-aea6ea953c96', 'CAB-025', '3a87a2d4-e28f-4ccc-bb40-008395ed497d', 'OFFLINE', '2026-08-22 08:36:59.7+00');
INSERT INTO "public"."cabinets" VALUES ('ca976d79-c5f1-42ba-ace2-50f0d6c071ae', 'CAB-026', '936571bf-9f4d-4fe4-abc8-499d35a690d4', 'MAINTENANCE', '2026-08-22 07:56:59.689+00');
INSERT INTO "public"."cabinets" VALUES ('1c294553-59f2-4efc-a7ba-a0a27cf3ece4', 'CAB-027', '1d114f91-4e67-4891-98a5-2d3b53675279', 'ONLINE', '2026-08-22 04:36:39.506+00');
INSERT INTO "public"."cabinets" VALUES ('60920ee8-11bc-4842-adfd-9fb49f56f205', 'CAB-028', 'bd61b007-02e6-452f-a145-9f44b9575d44', 'OFFLINE', '2026-08-22 09:46:25.715+00');
INSERT INTO "public"."cabinets" VALUES ('2ba35583-e01b-4dbd-a1c4-69595e0ce30c', 'CAB-029', '4a28d18e-43fe-40c1-a7fb-65c12987b6fe', 'MAINTENANCE', '2026-08-22 09:29:55.657+00');
INSERT INTO "public"."cabinets" VALUES ('4402c922-ba2d-4846-9566-15546d58f81b', 'CAB-030', 'bcde6e8a-4fa5-430f-a0e1-6967ff9eef3d', 'ONLINE', '2026-08-22 05:56:07.246+00');
INSERT INTO "public"."cabinets" VALUES ('2ec7a1b0-c037-4388-9f42-57e3aff10e00', 'CAB-031', '3ed03d16-88d8-4e4f-aa07-025438a0b39a', 'OFFLINE', '2026-08-22 05:28:17.016+00');
INSERT INTO "public"."cabinets" VALUES ('983c7399-f4e9-4890-84dd-8ec9e89f9346', 'CAB-032', '72a719f0-718e-45a4-8680-60f9df3e93a2', 'MAINTENANCE', '2026-08-22 08:52:39.058+00');
INSERT INTO "public"."cabinets" VALUES ('ff38869e-852b-4c5d-a0b2-d77d5c451b48', 'CAB-033', '81eecd88-7eb9-4a6d-822c-b124c3fc7441', 'ONLINE', '2026-08-22 09:48:24.971+00');
INSERT INTO "public"."cabinets" VALUES ('8f2e66bc-e379-4bfe-a52f-6d197d61994c', 'CAB-034', 'ea10c966-7183-4e47-9f4a-01ceb38f511b', 'OFFLINE', '2026-08-22 08:10:30.432+00');
INSERT INTO "public"."cabinets" VALUES ('288f1e22-039f-49d4-ac82-3f07c367637a', 'CAB-035', '3a87a2d4-e28f-4ccc-bb40-008395ed497d', 'MAINTENANCE', '2026-08-22 07:56:41.613+00');
INSERT INTO "public"."cabinets" VALUES ('97104fac-9840-4611-a18a-8737337f631e', 'CAB-036', '936571bf-9f4d-4fe4-abc8-499d35a690d4', 'ONLINE', '2026-08-22 05:41:04.213+00');
INSERT INTO "public"."cabinets" VALUES ('369acf3c-9541-433b-95b7-cfc8995fe030', 'CAB-037', '1d114f91-4e67-4891-98a5-2d3b53675279', 'OFFLINE', '2026-08-22 07:36:58.194+00');
INSERT INTO "public"."cabinets" VALUES ('9020cbb3-df58-4a1d-88f5-bd48e4bf062c', 'CAB-038', 'bd61b007-02e6-452f-a145-9f44b9575d44', 'MAINTENANCE', '2026-08-22 06:44:02.38+00');
INSERT INTO "public"."cabinets" VALUES ('7df404b3-2f94-4d20-8f04-43a5a963a6f5', 'CAB-039', '4a28d18e-43fe-40c1-a7fb-65c12987b6fe', 'ONLINE', '2026-08-22 09:05:54.635+00');
INSERT INTO "public"."cabinets" VALUES ('f335304b-a354-48f7-aa96-a4fe8869fca5', 'CAB-040', 'bcde6e8a-4fa5-430f-a0e1-6967ff9eef3d', 'OFFLINE', '2026-08-22 07:57:05.479+00');
INSERT INTO "public"."cabinets" VALUES ('6822723b-f873-4549-9fa1-c0af2d7c5510', 'CAB-041', '3ed03d16-88d8-4e4f-aa07-025438a0b39a', 'MAINTENANCE', '2026-08-22 09:53:26.111+00');
INSERT INTO "public"."cabinets" VALUES ('cd1e5386-84be-4b2e-beb7-0925aa62230a', 'CAB-042', '72a719f0-718e-45a4-8680-60f9df3e93a2', 'ONLINE', '2026-08-22 05:05:56.263+00');
INSERT INTO "public"."cabinets" VALUES ('8cf11ac5-fc45-4129-a4aa-bc7e5d47523a', 'CAB-043', '81eecd88-7eb9-4a6d-822c-b124c3fc7441', 'OFFLINE', '2026-08-22 09:43:42.3+00');
INSERT INTO "public"."cabinets" VALUES ('8b2debd8-ce34-4c6a-a220-61d46e429ffe', 'CAB-044', 'ea10c966-7183-4e47-9f4a-01ceb38f511b', 'MAINTENANCE', '2026-08-22 08:47:42.825+00');
INSERT INTO "public"."cabinets" VALUES ('b302205c-9ac6-43d1-b3b6-f0fde9273246', 'CAB-045', '3a87a2d4-e28f-4ccc-bb40-008395ed497d', 'ONLINE', '2026-08-22 05:51:52.16+00');
INSERT INTO "public"."cabinets" VALUES ('3891ae55-1bd7-47ad-85ae-f5e774876c10', 'CAB-046', '936571bf-9f4d-4fe4-abc8-499d35a690d4', 'OFFLINE', '2026-08-22 05:01:08.362+00');
INSERT INTO "public"."cabinets" VALUES ('5ddd133e-b6e6-4950-84f1-cbc26a9a8572', 'CAB-047', '1d114f91-4e67-4891-98a5-2d3b53675279', 'MAINTENANCE', '2026-08-22 07:43:27.678+00');
INSERT INTO "public"."cabinets" VALUES ('d1a2af37-bd9e-4664-9390-17894695685a', 'CAB-048', 'bd61b007-02e6-452f-a145-9f44b9575d44', 'ONLINE', '2026-08-22 06:32:10.875+00');
INSERT INTO "public"."cabinets" VALUES ('3c2679f0-9d45-4e4f-ace8-a8bad741583c', 'CAB-049', '4a28d18e-43fe-40c1-a7fb-65c12987b6fe', 'OFFLINE', '2026-08-22 07:20:28.513+00');
INSERT INTO "public"."cabinets" VALUES ('884242f3-1ece-4008-8e44-3e422609e075', 'CAB-050', 'bcde6e8a-4fa5-430f-a0e1-6967ff9eef3d', 'MAINTENANCE', '2026-08-22 05:35:32.286+00');

-- ----------------------------
-- Indexes structure for table cabinets
-- ----------------------------
CREATE INDEX "idx_cabinets_branch_status" ON "public"."cabinets" USING btree (
  "branch_id" "pg_catalog"."uuid_ops" ASC NULLS LAST,
  "status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table cabinets
-- ----------------------------
ALTER TABLE "public"."cabinets" ADD CONSTRAINT "cabinets_code_key" UNIQUE ("code");

-- ----------------------------
-- Checks structure for table cabinets
-- ----------------------------
ALTER TABLE "public"."cabinets" ADD CONSTRAINT "cabinets_status_check" CHECK (status = ANY (ARRAY['ONLINE'::text, 'OFFLINE'::text, 'MAINTENANCE'::text]));

-- ----------------------------
-- Primary Key structure for table cabinets
-- ----------------------------
ALTER TABLE "public"."cabinets" ADD CONSTRAINT "cabinets_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table cabinets
-- ----------------------------
ALTER TABLE "public"."cabinets" ADD CONSTRAINT "cabinets_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branches" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
