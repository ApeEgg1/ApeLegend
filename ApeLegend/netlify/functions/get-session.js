const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  const wallet = event.queryStringParameters.wallet;

  if (!wallet) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Wallet address required' })
    };
  }

  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('data')
      .eq('wallet', wallet.toLowerCase())
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data ? data.data : null)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
