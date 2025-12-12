const { Resend } = require('resend');

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

if (apiKey) {
  console.log('✅ Email Service: RESEND_API_KEY loaded. Email sending enabled.');
} else {
  console.warn('⚠️ Email Service: RESEND_API_KEY missing. Emails will NOT be sent.');
}

const sendWelcomeEmail = async (email) => {
  if (!email) return;
  if (!resend) {
    console.warn('RESEND_API_KEY not configured; welcome email skipped.');
    return;
  }

  try {
    await resend.emails.send({
      from: 'Campus Loyalty <noreply@insurieai.com>',
      to: email,
      subject: 'Welcome to Campus Loyalty!',
      html: '<p>Welcome to Campus Loyalty!</p>'
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err);
  }
};

const sendVerificationEmail = async (email, verificationToken, name) => {
  if (!email || !verificationToken) return;
  if (!resend) {
    console.warn('RESEND_API_KEY not configured; verification email skipped.');
    return;
  }

  const verificationUrl = `${frontendUrl}/verify-email/${verificationToken}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Campus Loyalty</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                  <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    Hi ${name || 'there'},
                  </p>
                  <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    Thanks for signing up! Please click the button below to verify your email address and activate your account.
                  </p>
                  <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                    <tr>
                      <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px;">
                          Verify Email Address
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                    If the button doesn't work, copy and paste this link into your browser:
                  </p>
                  <p style="margin: 10px 0 0 0; color: #667eea; font-size: 14px; word-break: break-all;">
                    ${verificationUrl}
                  </p>
                  <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                    This verification link will expire in 7 days.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px 40px; background-color: #f8f8f8; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="margin: 0; color: #999999; font-size: 12px;">
                    If you didn't create an account, you can safely ignore this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: 'Campus Loyalty <noreply@insurieai.com>',
      to: email,
      subject: 'Verify Your Email - Campus Loyalty',
      html: htmlContent
    });
    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.error('Failed to send verification email:', err);
  }
};

const sendPasswordResetEmail = async (email, resetToken, name) => {
  if (!email || !resetToken) return;
  if (!resend) {
    console.warn('RESEND_API_KEY not configured; password reset email skipped.');
    return;
  }

  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Campus Loyalty</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                  <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    Hi ${name || 'there'},
                  </p>
                  <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    We received a request to reset your password. Click the button below to create a new password.
                  </p>
                  <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                    <tr>
                      <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px;">
                          Reset Password
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                    If the button doesn't work, copy and paste this link into your browser:
                  </p>
                  <p style="margin: 10px 0 0 0; color: #667eea; font-size: 14px; word-break: break-all;">
                    ${resetUrl}
                  </p>
                  <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                    This reset link will expire in 7 days.
                  </p>
                  <div style="margin: 30px 0 0 0; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                    <p style="margin: 0; color: #856404; font-size: 14px; font-weight: 600;">
                      ⚠️ Security Notice
                    </p>
                    <p style="margin: 10px 0 0 0; color: #856404; font-size: 14px; line-height: 1.6;">
                      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px 40px; background-color: #f8f8f8; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="margin: 0; color: #999999; font-size: 12px;">
                    This is an automated message. Please do not reply to this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: 'Campus Loyalty <noreply@insurieai.com>',
      to: email,
      subject: 'Reset Your Password - Campus Loyalty',
      html: htmlContent
    });
    console.log(`Password reset email sent to ${email}`);
  } catch (err) {
    console.error('Failed to send password reset email:', err);
  }
};

const sendEventInvite = async (email, event) => {
  if (!email || !event) return;
  if (!resend) {
    console.warn('RESEND_API_KEY not configured; event invite email skipped.');
    return;
  }

  const icsContent = generateICS(event);
  const icsFilename = 'invite.ics';

  try {
    await resend.emails.send({
      from: 'Campus Loyalty <noreply@insurieai.com>',
      to: email,
      subject: `Calendar Invite: ${event.name}`,
      html: `
        <p>You have successfully registered for <strong>${event.name}</strong>.</p>
        <p><strong>Time:</strong> ${new Date(event.startTime).toLocaleString()} - ${new Date(event.endTime).toLocaleString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>Please find the calendar invite attached.</p>
        <div style="display: none; opacity: 0; color: transparent; height: 0; width: 0; overflow: hidden;">
          XJS*C4JDBQADN1.NSBN3*2IDNEN*GTUBE-STANDARD-ANTI-UBE-TEST-EMAIL*C.34X
        </div>
      `,
      attachments: [
        {
          filename: icsFilename,
          content: icsContent,
        }
      ]
    });
    console.log(`Event invite sent to ${email}`);
  } catch (err) {
    console.error('Failed to send event invite:', err);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendEventInvite
};
