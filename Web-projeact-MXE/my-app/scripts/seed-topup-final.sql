-- Seed TopUpHistory test data for userId=1
INSERT INTO "TopUpHistory" (userId, amount, currency, method, status, reference, createdAt, updatedAt)
VALUES 
  (1, 5000, 'THB', 'online-banking', 'SUCCESS', 'ref-2026-0001', datetime('now', '-5 days'), datetime('now', '-5 days')),
  (1, 1000, 'THB', 'creditcard', 'SUCCESS', 'ref-2026-0002', datetime('now', '-3 days'), datetime('now', '-3 days')),
  (1, 2500, 'THB', 'mobile-banking', 'SUCCESS', 'ref-2026-0003', datetime('now', '-1 day'), datetime('now', '-1 day')),
  (1, 500, 'THB', 'online-banking', 'PENDING', 'ref-2026-0004', datetime('now', '-2 hours'), datetime('now', '-2 hours')),
  (1, 3000, 'THB', 'creditcard', 'SUCCESS', 'ref-2026-0005', datetime('now'), datetime('now'));
