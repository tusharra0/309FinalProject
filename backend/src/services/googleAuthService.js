const { OAuth2Client } = require('google-auth-library');

const clientId = process.env.GOOGLE_CLIENT_ID;
const client = clientId ? new OAuth2Client(clientId) : null;

const verifyGoogleIdToken = async (idToken) => {
  if (!client) {
    const error = new Error('Google client not configured');
    error.status = 500;
    throw error;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId
    });
    const payload = ticket.getPayload();

    return {
      email: payload.email,
      name: payload.name || payload.given_name || '',
      emailVerified: Boolean(payload.email_verified)
    };
  } catch (err) {
    const error = new Error('Invalid Google token');
    error.status = 401;
    throw error;
  }
};

module.exports = {
  verifyGoogleIdToken
};
