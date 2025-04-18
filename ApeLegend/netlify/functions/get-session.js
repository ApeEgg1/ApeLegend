const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'sessions.json');

exports.handler = async function(event, context) {
  const wallet = event.queryStringParameters.wallet;
  if (!wallet) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Wallet address required" })
    };
  }

  let sessions = {};
  if (fs.existsSync(dataFile)) {
    sessions = JSON.parse(fs.readFileSync(dataFile));
  }

  const data = sessions[wallet.toLowerCase()] || null;
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};