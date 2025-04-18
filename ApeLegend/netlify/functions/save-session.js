let sessions = {};

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const { wallet, gameState } = JSON.parse(event.body);
    if (!wallet || !gameState) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing wallet or gameState" })
      };
    }

    sessions[wallet.toLowerCase()] = gameState;

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
