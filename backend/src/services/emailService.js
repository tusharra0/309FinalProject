const { Resend } = require('resend');

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const sendWelcomeEmail = async (email) => {
  if (!email) return;
  if (!resend) {
    console.warn('RESEND_API_KEY not configured; welcome email skipped.');
    return;
  }

  try {
    await resend.emails.send({
      from: 'Campus Loyalty <no-reply@campusloyalty.app>',
      to: email,
      subject: 'Welcome to Campus Loyalty!',
      html: '<p>Welcome to Campus Loyalty!</p>'
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err);
  }
};

module.exports = {
  sendWelcomeEmail
};
