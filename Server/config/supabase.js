const {createClient} = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('user').select('*').limit(1);
    if (error) {
        throw new Error(`Supabase connection error: ${error.message}`);
    }
    console.log('Supabase connected successfully');
  }

  catch (error) {
    console.error('Error connecting to Supabase:', error.message);
  }
}

checkConnection();

module.exports = supabase;