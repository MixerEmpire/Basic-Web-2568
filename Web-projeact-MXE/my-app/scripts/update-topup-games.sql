-- Update TopUpHistory records with game names
-- Cycle through available games

UPDATE "TopUpHistory" SET game = 'MOBILE LEGENDS' WHERE id % 12 = 1 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'LEAGUE OF LEGENDS' WHERE id % 12 = 2 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'PUBG' WHERE id % 12 = 3 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'VALORANT' WHERE id % 12 = 4 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'HONKAI: STAR RAIL' WHERE id % 12 = 5 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'GENSHIN IMPACT' WHERE id % 12 = 6 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'DOTA 2' WHERE id % 12 = 7 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'ROV' WHERE id % 12 = 8 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'OVERWATCH' WHERE id % 12 = 9 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'APEX LEGENDS' WHERE id % 12 = 10 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'CALL OF DUTY MOBILE' WHERE id % 12 = 11 AND game IS NULL;
UPDATE "TopUpHistory" SET game = 'BLOOD STRIKE' WHERE id % 12 = 0 AND game IS NULL;

-- Verify
SELECT id, game, amount, status FROM "TopUpHistory" ORDER BY id DESC LIMIT 15;
