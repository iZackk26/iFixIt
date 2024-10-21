import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Crear un pool de conexiones usando la URL de la base de datos desde Heroku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Esto es importante para que Heroku funcione bien con SSL
  }
});
