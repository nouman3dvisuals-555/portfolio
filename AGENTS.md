# Autonomous Agent Guidelines & Repository Sync Rules

## 🔄 Dual Repository Git Sync Protocol
Whenever code modifications are completed and verified:

1. **Frontend / Client Repository (`client/`)**:
   - Remote: `https://github.com/nouman3dvisuals-555/frontend.git` (`branch: main`)
   - When any file in `client/` is updated, tested, and verified, commit the changes with a concise, descriptive message and automatically push to `origin main`.
   - **Security**: Never commit `.env` files. Ensure only `.env.example` is tracked.

2. **Backend / Server Repository (`server/`)**:
   - Remote: `https://github.com/nouman3dvisuals-555/backend.git` (`branch: main`)
   - When any file in `server/` is updated, tested, and verified, commit the changes with a concise, descriptive message and automatically push to `origin main`.
   - **Security**: Never commit `.env` files.

3. **Verification**:
   - Always run `npm run build` on the client before pushing frontend changes to ensure zero build errors.
