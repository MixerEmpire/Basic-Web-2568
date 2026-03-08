-- Verify TopUpHistory data
SELECT 'User TopUps' as info;
SELECT COUNT(*) as total_topups FROM "TopUpHistory" WHERE userId = 1;
SELECT * FROM "TopUpHistory" WHERE userId = 1 ORDER BY createdAt DESC;
