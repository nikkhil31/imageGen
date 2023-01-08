import pkg from 'pg';


const { Pool } = pkg;


const connectionString = 'postgresql://nikkhil:v2_3xXia_uazPstyKxNNi2ewwf6imKi6@db.bit.io/nikkhil/usestencil?ssl=true'
 
const pool = new Pool({
  connectionString,
})

export default pool

