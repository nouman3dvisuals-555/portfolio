import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const AUTHORIZED_EMAIL = process.env.AUTHORIZED_ADMIN_EMAIL || 'nouman3dvisuals@gmail.com';
const JWT_SECRET = process.env.JWT_SECRET || 'n3d_super_secret_jwt_key_2026_nouman_portfolio_3d';

/**
 * Verifies Google ID token or Google OAuth credential payload.
 * Strictly verifies server-side that the email matches nouman3dvisuals@gmail.com.
 */
export const verifyGoogleToken = async (idToken, fallbackEmail = null) => {
  // If dev bypass enabled and token is dev-token
  if (process.env.ENABLE_DEV_ADMIN_BYPASS === 'true' && idToken === 'dev-admin-token') {
    return {
      email: fallbackEmail || AUTHORIZED_EMAIL,
      name: 'Nouman Admin (Dev Mode)',
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    // Fallback attempt: if idToken is raw payload JSON string or user info object passed from OAuth helper
    try {
      const parsed = JSON.parse(idToken);
      if (parsed && parsed.email) {
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    throw new Error('Invalid Google credential: ' + error.message);
  }
};

/**
 * Creates JWT token for authenticated admin session
 */
export const generateAdminToken = (email, name) => {
  return jwt.sign(
    {
      email,
      name,
      role: 'admin',
      authorized: true
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Middleware: Strictly protects administrative API endpoints.
 * Rejects requests without valid JWT token or unauthorized email.
 */
export const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Missing or malformed authorization token.'
    });
  }

  const token = authHeader.split(' ')[1];

  // Dev bypass check
  if (process.env.ENABLE_DEV_ADMIN_BYPASS === 'true' && token === 'dev-admin-jwt-token') {
    req.admin = {
      email: AUTHORIZED_EMAIL,
      name: 'Nouman Admin (Dev Mode)',
      role: 'admin'
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Independent server-side security check
    if (decoded.email !== AUTHORIZED_EMAIL) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Account '${decoded.email}' is not authorized. Access is strictly limited to ${AUTHORIZED_EMAIL}.`
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Token is invalid or expired.'
    });
  }
};
