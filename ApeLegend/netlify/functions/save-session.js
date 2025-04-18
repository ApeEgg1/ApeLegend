const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'sessions.json');

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

    let sessions = {};
    if (fs.existsSync(dataFile)) {
      sessions = JSON.parse(fs.readFileSync(dataFile));
    }

    sessions[wallet.toLowerCase()] = gameState;
    fs.writeFileSync(dataFile, JSON.stringify(sessions, null, 2));

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