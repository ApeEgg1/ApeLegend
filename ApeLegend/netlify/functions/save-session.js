const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { wallet, gameState } = JSON.parse(event.body);

    if (!wallet || !gameState) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing wallet or gameState' })
      };
    }

    const { error } = await supabase
      .from('sessions')
      .upsert({ wallet: wallet.toLowerCase(), data: gameState });

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
