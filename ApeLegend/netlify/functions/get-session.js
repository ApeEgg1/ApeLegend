let sessions = {};

exports.handler = async function(event, context) {
  const wallet = event.queryStringParameters.wallet;
  if (!wallet) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Wallet address required" })
    };
  }

  const data = sessions[wallet.toLowerCase()] || null;
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
