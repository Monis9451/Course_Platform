const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
    throw new Error('Supabase URL and Service Role Key are required in environment variables.');
}

const supabase = createClient(supabaseUrl, serviceKey);

module.exports = supabase;