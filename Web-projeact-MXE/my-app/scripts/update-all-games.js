// Update ALL TopUpHistory records with game names - fill remaining nulls
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
  console.log('[Update All Games] Starting...');

  // Get ALL records for userId=1
  const allRecords = db.prepare(`
    SELECT id FROM "TopUpHistory" 
    WHERE userId = 1
    ORDER BY id ASC
  `).all();

  console.log(`[Update All Games] Found ${allRecords.length} total records for userId=1`);

  const updateStmt = db.prepare(`
    UPDATE "TopUpHistory" 
    SET game = ? 
    WHERE id = ?
  `);

  // Update each one
  for (let i = 0; i < allRecords.length; i++) {
    const record = allRecords[i];
    const game = games[i % games.length]; // cycle through all 12 games
    
    updateStmt.run(game, record.id);
    console.log(`  [${i + 1}/${allRecords.length}] ID ${record.id} -> ${game}`);
  }

  console.log('[Update All Games] ✓ Done! All records now have game names.');

  // Verify by showing COUNT
  const countResult = db.prepare(`
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN game IS NOT NULL THEN 1 END) as with_game,
      COUNT(CASE WHEN game IS NULL THEN 1 END) as without_game
    FROM "TopUpHistory" 
    WHERE userId = 1
  `).get();

  console.log('\n[Update All Games] Summary:');
  console.log(`  Total records: ${countResult.total}`);
  console.log(`  With game: ${countResult.with_game}`);
  console.log(`  Without game: ${countResult.without_game}`);

} catch (e) {
  console.error('[Update All Games] Error:', e.message);
} finally {
  db.close();
}
