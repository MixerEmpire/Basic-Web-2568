-- Check all TopUpHistory records
.mode column
.headers on

SELECT 'Total TopUpHistory records:' as info;
SELECT COUNT(*) as count FROM "TopUpHistory";

SELECT '' as '';
SELECT 'All TopUpHistory data:' as info;
SELECT id, userId, amount, currency, method, status, reference, createdAt FROM "TopUpHistory" ORDER BY createdAt DESC;

SELECT '' as '';
SELECT 'User count and topups per user:' as info;
SELECT userId, COUNT(*) as topup_count, SUM(amount) as total_amount FROM "TopUpHistory" GROUP BY userId;
