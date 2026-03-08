-- Test data for top-up history

-- Create several test top-up records for user 1
INSERT INTO "TopUpHistory" (userId, game, amount, currency, method, status, reference, createdAt, updatedAt)
VALUES 
  (1, 'MOBILE LEGENDS', 500, 'THB', 'online-banking', 'SUCCESS', 'ref-001-' || datetime('now'), datetime('now', '-1 day'), datetime('now', '-1 day')),
  (1, 'PUBG', 1000, 'THB', 'creditcard', 'SUCCESS', 'ref-002-' || datetime('now'), datetime('now', '-2 days'), datetime('now', '-2 days')),
  (1, 'VALORANT', 250, 'THB', 'mobile-banking', 'PENDING', 'ref-003-' || datetime('now'), datetime('now', '-3 hours'), datetime('now', '-3 hours')),
  (1, 'DOTA 2', 2000, 'THB', 'online-banking', 'SUCCESS', 'ref-004-' || datetime('now'), datetime('now', '-5 days'), datetime('now', '-5 days')),
  (1, 'LEAGUE OF LEGENDS', 750, 'THB', 'creditcard', 'FAILED', 'ref-005-' || datetime('now'), datetime('now', '-8 days'), datetime('now', '-8 days'));
