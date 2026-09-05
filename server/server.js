import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { connectDB } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { seedDatabase } from './seed/seedProjects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxies (Render, Vercel, Railway) for secure HTTPS protocols
app.set('trust proxy', 1);

// CORS configuration supporting local dev and deployed frontend domains
const clientUrl = process.env.CLIENT_URL;
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  clientUrl
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like health checks, curl, mobile)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    // Allow Vercel preview or production deployments
    if (origin.endsWith('.vercel.app') || (clientUrl && origin === clientUrl.replace(/\/$/, ''))) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads serving for uploaded media assets
const uploadsPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'N3D Portfolio API',
    authorizedAdmin: process.env.AUTHORIZED_ADMIN_EMAIL || 'nouman3dvisuals@gmail.com',
    time: new Date().toISOString()
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  N3D Portfolio Backend Server running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  Authorized Admin: ${process.env.AUTHORIZED_ADMIN_EMAIL || 'nouman3dvisuals@gmail.com'}`);
  console.log(`====================================================`);
});

connectDB().then(async (isDbConnected) => {
  if (isDbConnected) {
    await seedDatabase();
  }
});

