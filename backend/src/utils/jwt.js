const jwt = require('jsonwebtoken');

const JWT_TTL_MS = 24 * 60 * 60 * 1000;

const normalizeRole = (role) =>
  typeof role === 'string' ? role.toLowerCase() : role;

const signAppJwt = ({ id, role }) => {
  const payload = {
    userId: id,
    role: normalizeRole(role)
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  const expiresAt = new Date(Date.now() + JWT_TTL_MS).toISOString();

  return { token, expiresAt };
};

module.exports = {
  signAppJwt
};
