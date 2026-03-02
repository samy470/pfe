import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'gamesdb',
  user: 'postgres',
  password: 'mysecretpassword'
});

export const gameService = {
  async getAllGames() {
    const result = await pool.query('SELECT * FROM games ORDER BY id');
    return result.rows;
  },

  async getGameById(id: number) {
    const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
    return result.rows[0];
  },

  async searchGames(query: string) {
    const result = await pool.query(
      'SELECT * FROM games WHERE name ILIKE $1',
      [`%${query}%`]
    );
    return result.rows;
  }
};