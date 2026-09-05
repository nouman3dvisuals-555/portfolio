# Nouman 3D Visuals — Backend API

Backend REST API for Nouman 3D Visuals Portfolio & CMS. Built with Express.js, Node.js, and MongoDB Atlas.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (via Mongoose)
- **Authentication**: Google OAuth2 & JWT
- **Media Handling**: Multer

## Setup & Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   AUTHORIZED_ADMIN_EMAIL=nouman3dvisuals@gmail.com
   ENABLE_DEV_ADMIN_BYPASS=false
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Health Check
- `GET /api/health` — Returns status of API and database connection.
