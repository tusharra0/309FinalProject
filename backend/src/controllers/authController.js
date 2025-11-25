const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { sendWelcomeEmail } = require('../services/emailService');
const { verifyGoogleIdToken } = require('../services/googleAuthService');
const { signAppJwt } = require('../utils/jwt');

const prisma = new PrismaClient();
const RESET_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const getUnknownFields = (payload, allowedFields) =>
  Object.keys(payload).filter((field) => !allowedFields.includes(field));

const formatUnknownFieldMessage = (fields) => `Unknown field(s): ${fields.join(', ')}`;

const isValidUtorid = (value) => typeof value === 'string' && /^[a-z0-9]{7,8}$/.test(value);

const isValidPassword = (value) => {
  if (typeof value !== 'string') return false;
  if (value.length < 8 || value.length > 64) return false;
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[!@#$%^&*]/.test(value);
  return hasLower && hasUpper && hasNumber && hasSymbol;
};

const isValidEmail = (value) => {
  if (typeof value !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) && value.toLowerCase().endsWith('@mail.utoronto.ca');
};

const deriveUtoridFromEmail = (email) => {
  const [localPart = ''] = email.split('@');
  const sanitized = localPart.toLowerCase().replace(/[^a-z0-9]/g, '');
  let candidate = sanitized.slice(0, 8);
  if (candidate.length < 7) {
    candidate = candidate.padEnd(7, '0');
  }
  return candidate;
};

const findAvailableUtorid = async (baseUtorid) => {
  let candidate = baseUtorid;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    if (isValidUtorid(candidate)) {
      const existing = await prisma.user.findUnique({ where: { utorid: candidate } });
      if (!existing) return candidate;
    }
    const suffix = Math.random().toString(36).replace(/[^a-z0-9]/g, '').slice(0, 2);
    candidate = `${baseUtorid}${suffix}`.slice(0, 8);
    if (candidate.length < 7) {
      candidate = candidate.padEnd(7, '0');
    }
  }
  return candidate;
};

exports.signUp = async (req, res) => {
  const body = req.body || {};
  const unknownFields = getUnknownFields(body, ['utorid', 'email', 'password', 'confirmPassword', 'name']);

  if (unknownFields.length > 0) {
    return res.status(400).json({ message: formatUnknownFieldMessage(unknownFields) });
  }

  const utorid = body.utorid ? String(body.utorid).toLowerCase() : '';
  const email = body.email ? String(body.email).toLowerCase() : '';
  const password = body.password;
  const confirmPassword = body.confirmPassword;
  const displayName = body.name ? String(body.name).trim() : utorid;

  if (!utorid) {
    return res.status(400).json({ message: 'Utorid is required' });
  }

  if (!isValidUtorid(utorid)) {
    return res.status(400).json({ message: 'Invalid utorid.' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email.' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required.' });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ message: 'Invalid password.' });
  }

  if (confirmPassword !== undefined && confirmPassword !== password) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ utorid }, { email }]
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'A user with that utorid or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        utorid,
        email,
        password: hashedPassword,
        name: displayName || utorid,
        role: 'regular',
        verified: true
      }
    });

    await sendWelcomeEmail(user.email);

    const { token, expiresAt } = signAppJwt({ id: user.id, role: user.role });
    return res.status(201).json({ token, expiresAt });
  } catch (err) {
    console.error('Signup failed:', err);
    return res.status(500).json({ message: 'Failed to create user' });
  }
};

exports.login = async (req, res) => {
  const body = req.body || {};
  const unknownFields = getUnknownFields(body, ['utorid', 'password']);

  if (unknownFields.length > 0) {
    return res.status(400).json({ message: formatUnknownFieldMessage(unknownFields) });
  }

  const { utorid, password } = body;

  if (utorid === undefined || utorid === null || utorid === '') {
    return res.status(400).json({ message: 'Utorid is required' });
  }

  if (!isValidUtorid(utorid)) {
    return res.status(400).json({ message: 'Invalid utorid.' });
  }

  if (password === undefined || password === null || password === '') {
    return res.status(400).json({ message: 'Password is required.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { utorid }
    });

    if (!user || !user.password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const loginTimestamp = new Date();
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: loginTimestamp
      }
    });

    const normalizedRole = typeof user.role === 'string' ? user.role.toLowerCase() : user.role;

    const expiresIn = '24h';
    const token = jwt.sign(
      {
        id: user.id,
        utorid: user.utorid,
        role: normalizedRole
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    return res.status(200).json({ token, expiresAt });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Login failed' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const body = req.body || {};
  const unknownFields = getUnknownFields(body, ['utorid']);

  if (unknownFields.length > 0) {
    return res.status(400).json({ message: formatUnknownFieldMessage(unknownFields) });
  }

  const { utorid } = body;

  if (utorid === undefined || utorid === null || utorid === '') {
    return res.status(400).json({ message: 'Utorid is required' });
  }

  if (!isValidUtorid(utorid)) {
    return res.status(400).json({ message: 'Invalid utorid.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { utorid } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        expiresAt
      }
    });

    return res.status(202).json({
      resetToken,
      expiresAt: expiresAt.toISOString()
    });
  } catch (err) {
    console.error('Failed to issue reset token:', err);
    return res.status(500).json({ message: 'Failed to issue reset token' });
  }
};

exports.resetPasswordWithToken = async (req, res) => {
  const body = req.body || {};
  const unknownFields = getUnknownFields(body, ['utorid', 'password']);

  if (unknownFields.length > 0) {
    return res.status(400).json({ message: formatUnknownFieldMessage(unknownFields) });
  }

  const { utorid, password } = body;

  if (utorid === undefined || utorid === null || utorid === '') {
    return res.status(400).json({ message: 'Utorid is required' });
  }

  if (!isValidUtorid(utorid)) {
    return res.status(400).json({ message: 'Invalid utorid.' });
  }

  if (password === undefined || password === null || password === '') {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ message: 'Invalid password.' });
  }

  const { resetToken } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { resetToken }
    });

    if (!user) {
      return res.status(404).json({ message: 'Token not found' });
    }

    if (!user.expiresAt || user.expiresAt < new Date()) {
      return res.status(410).json({ message: 'Token expired' });
    }

    if (user.utorid !== utorid) {
      return res.status(401).json({ message: 'Token does not match user' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        expiresAt: null
      }
    });

    return res.status(200).end();
  } catch (err) {
    console.error('Failed to reset password:', err);
    return res.status(500).json({ message: 'Failed to reset password' });
  }
};

exports.googleLogin = async (req, res) => {
  const body = req.body || {};
  const unknownFields = getUnknownFields(body, ['googleIdToken']);

  if (unknownFields.length > 0) {
    return res.status(400).json({ message: formatUnknownFieldMessage(unknownFields) });
  }

  const googleIdToken = body.googleIdToken;
  if (!googleIdToken) {
    return res.status(400).json({ message: 'googleIdToken is required' });
  }

  try {
    const profile = await verifyGoogleIdToken(googleIdToken);

    if (!profile?.email || !isValidEmail(profile.email)) {
      return res.status(400).json({ message: 'Invalid Google account email' });
    }

    const normalizedEmail = profile.email.toLowerCase();
    const derivedUtorid = await findAvailableUtorid(deriveUtoridFromEmail(normalizedEmail));
    const name = profile.name?.trim() || derivedUtorid;

    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    const isNewUser = !user;

    if (!user) {
      user = await prisma.user.create({
        data: {
          utorid: derivedUtorid,
          email: normalizedEmail,
          name,
          role: 'regular',
          verified: true
        }
      });
    }

    if (isNewUser) {
      await sendWelcomeEmail(user.email);
    }

    const { token, expiresAt } = signAppJwt({ id: user.id, role: user.role });
    return res.status(200).json({ token, expiresAt });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    console.error('Google login error:', err);
    return res.status(500).json({ message: 'Google login failed' });
  }
};
