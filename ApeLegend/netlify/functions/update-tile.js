const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const tile = JSON.parse(event.body);
    console.log("🚀 Supabase update payload:", tile);

    const { error } = await supabase.from('tiles')
      .update({
        owner: tile.owner,
        nft_ids: tile.nft_ids || [],  // ✅ fixed here
        buildings: tile.buildings,
        in_transit: tile.in_transit,
        arrival_time: tile.arrival_time,
        transit_start_time: tile.transit_start_time
      })
      .eq('id', tile.id);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("❌ Supabase update failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message, stack: err.stack })
    };
  }
};
