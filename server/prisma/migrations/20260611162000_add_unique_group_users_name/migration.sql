DELETE FROM "group_users" duplicate_user
USING "group_users" original_user
WHERE duplicate_user."group_id" = original_user."group_id"
  AND duplicate_user."name" = original_user."name"
  AND duplicate_user."id" > original_user."id";

CREATE UNIQUE INDEX "group_users_group_id_name_key" ON "group_users"("group_id", "name");
