const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres.msgfauhvewinpfcbgexl:DR%2AeF298P.9UH6u@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;