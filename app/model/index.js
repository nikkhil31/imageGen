import pool from "../config/postgresql.js"

export const query = (text, params) => pool.query(text, params)

