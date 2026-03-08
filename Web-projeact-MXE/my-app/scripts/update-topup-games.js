// Update existing TopUpHistory records with game names using better-sqlite3
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
const db = new Database(dbPath);

const games = [
  'MOBILE LEGENDS',
  'LEAGUE OF LEGENDS',
  'PUBG',
  'VALORANT',
  'HONKAI: STAR RAIL',
  'GENSHIN IMPACT',
  'DOTA 2',
  'ROV',
  'OVERWATCH',
  'APEX LEGENDS',
  'CALL OF DUTY MOBILE',
  'BLOOD STRIKE',
];

try {
  console.log('[Update Games] Starting...');

  // Get records without game names
  const selectStmt = db.prepare(`
    SELECT id FROM "TopUpHistory" 
    WHERE game IS NULL AND userId = 1
    ORDER BY id ASC
  `);
  
  const recordsWithoutGame = selectStmt.all();
  console.log(`[Update Games] Found ${recordsWithoutGame.length} records without game names`);

  // Update each record
  const updateStmt = db.prepare(`
    UPDATE "TopUpHistory" 
    SET game = ? 
    WHERE id = ?
  `);

  for (let i = 0; i < recordsWithoutGame.length; i++) {
    const record = recordsWithoutGame[i];
    const game = games[i % games.length];
    
    updateStmt.run(game, record.id);
    console.log(`  [${i + 1}/${recordsWithoutGame.length}] ID ${record.id}: ${game}`);
  }

  console.log('[Update Games] Done!');

  // Verify
  const verifyStmt = db.prepare(`
    SELECT id, game, amount, status FROM "TopUpHistory"
    WHERE userId = 1
    ORDER BY id DESC
    LIMIT 15
  `);
  
  const results = verifyStmt.all();
  console.log('\n[Update Games] Updated records:');
  results.forEach(r => {
    console.log(`  ID: ${r.id}, Game: ${r.game || 'null'}, Amount: ${r.amount}, Status: ${r.status}`);
  });

} catch (e) {
  console.error('[Update Games] Error:', e.message);
} finally {
  db.close();
}
